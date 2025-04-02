import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { db } from "./firebase";
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import ProfileWeb from "./components/ProfileWeb";
import Calendar from "./components/Calendar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { Profile } from "./types/Profile";
import "./App.css";

function AppContent() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "profiles"),
      where("userId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const profilesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Profile[];
      setProfiles(profilesData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleAddProfile = async (profileData: Omit<Profile, "id" | "userId" | "createdAt">) => {
    if (!currentUser) return;
    
    try {
      await addDoc(collection(db, "profiles"), {
        ...profileData,
        userId: currentUser.uid,
        createdAt: new Date().toISOString(),
      });
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };

  const handleUpdateProfile = async (profileId: string, updatedData: Partial<Profile>) => {
    try {
      const profileRef = doc(db, "profiles", profileId);
      await updateDoc(profileRef, updatedData);
      setEditingProfile(null);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDeleteProfile = async (profileId: string) => {
    try {
      const profileRef = doc(db, "profiles", profileId);
      await deleteDoc(profileRef);
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Family & Friends Network</h1>
        <div className="header-buttons">
          <button className="add-profile-button" onClick={() => setShowAddModal(true)}>
            Add Profile
          </button>
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <main>
        <div className="web-container">
          <ProfileWeb
            profiles={profiles}
            onProfileClick={setEditingProfile}
            onAddProfile={handleAddProfile}
            onUpdateProfile={handleUpdateProfile}
            onDeleteProfile={handleDeleteProfile}
            showAddModal={showAddModal}
            setShowAddModal={setShowAddModal}
            editingProfile={editingProfile}
            setEditingProfile={setEditingProfile}
          />
        </div>
        <Calendar profiles={profiles} />
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppContent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
