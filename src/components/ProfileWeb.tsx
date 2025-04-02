import React, { useEffect, useRef, useState } from 'react';
import { Profile } from '../types/Profile';
import EditProfileModal from "./EditProfileModal";

interface ProfileWebProps {
  profiles: Profile[];
  onProfileClick: (profile: Profile) => void;
  onAddProfile: (profileData: Omit<Profile, "id" | "userId" | "createdAt">) => Promise<void>;
  onUpdateProfile: (profileId: string, updatedData: Partial<Profile>) => Promise<void>;
  onDeleteProfile: (profileId: string) => Promise<void>;
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  editingProfile: Profile | null;
  setEditingProfile: (profile: Profile | null) => void;
}

const ProfileWeb: React.FC<ProfileWebProps> = ({
  profiles,
  onProfileClick,
  onAddProfile,
  onUpdateProfile,
  onDeleteProfile,
  showAddModal,
  setShowAddModal,
  editingProfile,
  setEditingProfile,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipData, setTooltipData] = useState<Profile | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const NODE_RADIUS = 30;
  const CENTER_DISTANCE = 300; // 4 inches in pixels (assuming 96 DPI)
  const CANVAS_SIZE = 1000; // Increased to accommodate larger radius

  // Group profiles by surname
  const groupedProfiles = profiles.reduce((groups, profile) => {
    const surname = profile.fullName.split(' ').pop() || 'Other';
    if (!groups[surname]) {
      groups[surname] = [];
    }
    groups[surname].push(profile);
    return groups;
  }, {} as Record<string, Profile[]>);

  // Sort groups by size (largest groups first) and flatten into array
  const sortedProfiles = Object.entries(groupedProfiles)
    .sort(([, a], [, b]) => b.length - a.length) // Sort groups by size
    .flatMap(([, profiles]) => profiles);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawWeb = () => {
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      
      // Draw center node (user)
      ctx.beginPath();
      ctx.arc(
        CANVAS_SIZE / 2 + offset.x,
        CANVAS_SIZE / 2 + offset.y,
        NODE_RADIUS,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = '#4a90e2';
      ctx.fill();
      ctx.strokeStyle = '#357abd';
      ctx.stroke();

      // Draw "Me" label in center node
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Me', CANVAS_SIZE / 2 + offset.x, CANVAS_SIZE / 2 + offset.y);

      // Draw family connection lines first
      sortedProfiles.forEach((profile1, index1) => {
        const surname1 = profile1.fullName.split(' ').pop() || '';
        const groupSize1 = groupedProfiles[surname1]?.length || 0;

        if (groupSize1 > 1) {
          sortedProfiles.forEach((profile2, index2) => {
            if (index1 < index2) { // Only draw each connection once
              const surname2 = profile2.fullName.split(' ').pop() || '';
              if (surname1 === surname2) {
                const angle1 = (2 * Math.PI * index1) / sortedProfiles.length;
                const angle2 = (2 * Math.PI * index2) / sortedProfiles.length;
                const x1 = CANVAS_SIZE / 2 + offset.x + CENTER_DISTANCE * Math.cos(angle1);
                const y1 = CANVAS_SIZE / 2 + offset.y + CENTER_DISTANCE * Math.sin(angle1);
                const x2 = CANVAS_SIZE / 2 + offset.x + CENTER_DISTANCE * Math.cos(angle2);
                const y2 = CANVAS_SIZE / 2 + offset.y + CENTER_DISTANCE * Math.sin(angle2);

                // Calculate the arc path
                const centerX = CANVAS_SIZE / 2 + offset.x;
                const centerY = CANVAS_SIZE / 2 + offset.y;
                const radius = CENTER_DISTANCE;
                const startAngle = angle1;
                const endAngle = angle2;
                
                // Determine if we should draw the arc clockwise or counterclockwise
                // based on which path is shorter
                const clockwise = (endAngle - startAngle + 2 * Math.PI) % (2 * Math.PI) <= Math.PI;

                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, startAngle, endAngle, !clockwise);
                ctx.strokeStyle = '#4a90e2';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.lineWidth = 1;
              }
            }
          });
        }
      });
      
      // Draw profile nodes and center connections
      sortedProfiles.forEach((profile, index) => {
        const angle = (2 * Math.PI * index) / sortedProfiles.length;
        const x = CANVAS_SIZE / 2 + offset.x + CENTER_DISTANCE * Math.cos(angle);
        const y = CANVAS_SIZE / 2 + offset.y + CENTER_DISTANCE * Math.sin(angle);

        // Draw connection line to center
        ctx.beginPath();
        ctx.moveTo(CANVAS_SIZE / 2 + offset.x, CANVAS_SIZE / 2 + offset.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#ddd';
        ctx.stroke();

        // Draw profile node
        ctx.beginPath();
        ctx.arc(x, y, NODE_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = tooltipData?.id === profile.id ? '#357abd' : '#4a90e2';
        ctx.fill();
        ctx.strokeStyle = '#357abd';
        ctx.stroke();

        // Draw initials
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const initials = profile.fullName
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase();
        ctx.fillText(initials, x, y);
      });
    };

    drawWeb();
  }, [profiles, tooltipData, offset, sortedProfiles]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDragging) {
      setOffset(prev => ({
        x: prev.x + (x - dragStart.x),
        y: prev.y + (y - dragStart.y),
      }));
      setDragStart({ x, y });
    } else {
      // Check if mouse is over any profile node
      const hoveredProfile = sortedProfiles.find((profile, index) => {
        const angle = (2 * Math.PI * index) / sortedProfiles.length;
        const nodeX = CANVAS_SIZE / 2 + offset.x + CENTER_DISTANCE * Math.cos(angle);
        const nodeY = CANVAS_SIZE / 2 + offset.y + CENTER_DISTANCE * Math.sin(angle);
        const distance = Math.sqrt(
          Math.pow(x - nodeX, 2) + Math.pow(y - nodeY, 2)
        );
        return distance <= NODE_RADIUS;
      });

      if (hoveredProfile) {
        setTooltipData(hoveredProfile);
        setTooltipPosition({ x: e.clientX, y: e.clientY });
      } else {
        setTooltipData(null);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleProfileClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tooltipData) {
      onProfileClick(tooltipData);
    }
  };

  return (
    <div className="profile-web">
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleProfileClick}
      />
      {tooltipData && (
        <div
          ref={tooltipRef}
          className="profile-tooltip"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y + 10,
          }}
        >
          <h3>{tooltipData.fullName}</h3>
          <div className="tooltip-content">
            <p><strong>Birthday:</strong> {new Date(tooltipData.birthday).toLocaleDateString()}</p>
            <p><strong>Relation:</strong> {tooltipData.relation}</p>
            <p><strong>Occupation:</strong> {tooltipData.occupation}</p>
            <p><strong>Favorite Color:</strong> {tooltipData.favoriteColor}</p>
            <p><strong>Favorite Food:</strong> {tooltipData.favoriteFood}</p>
            <p><strong>Hobbies:</strong> {tooltipData.hobbies.join(', ')}</p>
          </div>
        </div>
      )}
      {showAddModal && (
        <EditProfileModal
          profile={null}
          onClose={() => setShowAddModal(false)}
          onSave={onAddProfile}
        />
      )}
      {editingProfile && (
        <EditProfileModal
          profile={editingProfile}
          onClose={() => setEditingProfile(null)}
          onSave={(data) => onUpdateProfile(editingProfile.id, data)}
        />
      )}
    </div>
  );
};

export default ProfileWeb; 