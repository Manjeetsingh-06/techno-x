import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleGuard } from './RoleGuard';

import { LoadingState } from '../components/common/LoadingState';

// ── Layouts ─────────────────────────────────────────────────────────────────
import { PublicLayout } from '../layouts/PublicLayout';
import { StudentLayout } from '../layouts/StudentLayout';
import { FacultyLayout } from '../layouts/FacultyLayout';
import { CommitteeLayout } from '../layouts/CommitteeLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// ── Public Pages ─────────────────────────────────────────────────────────────
const HomePage = lazy(() => import('../pages/public/HomePage').then(m => ({ default: m.HomePage })));
const EventsPage = lazy(() => import('../pages/public/EventsPage').then(m => ({ default: m.EventsPage })));
const EventDetailsPage = lazy(() => import('../pages/public/EventDetailsPage').then(m => ({ default: m.EventDetailsPage })));
const AboutPage = lazy(() => import('../pages/public/AboutPage').then(m => ({ default: m.AboutPage })));
const ClubsPage = lazy(() => import('../pages/public/ClubsPage').then(m => ({ default: m.ClubsPage })));
const CommitteesPage = lazy(() => import('../pages/public/CommitteesPage').then(m => ({ default: m.CommitteesPage })));
const ContactPage = lazy(() => import('../pages/public/ContactPage').then(m => ({ default: m.ContactPage })));

// ── Auth Pages ────────────────────────────────────────────────────────────────
const LoginPage = lazy(() => import('../pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage').then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import('../pages/auth/ResetPasswordPage').then(m => ({ default: m.ResetPasswordPage })));

// ── Student Pages ─────────────────────────────────────────────────────────────
const StudentDashboard = lazy(() => import('../pages/student/StudentDashboard').then(m => ({ default: m.StudentDashboard })));
const StudentEventsPage = lazy(() => import('../pages/student/StudentEventsPage').then(m => ({ default: m.StudentEventsPage })));
const StudentRegistrationsPage = lazy(() => import('../pages/student/StudentRegistrationsPage').then(m => ({ default: m.StudentRegistrationsPage })));
const StudentPassPage = lazy(() => import('../pages/student/StudentPassPage').then(m => ({ default: m.StudentPassPage })));
const StudentCalendarPage = lazy(() => import('../pages/student/StudentCalendarPage').then(m => ({ default: m.StudentCalendarPage })));
const StudentNotificationsPage = lazy(() => import('../pages/student/StudentNotificationsPage').then(m => ({ default: m.StudentNotificationsPage })));
const StudentProfilePage = lazy(() => import('../pages/student/StudentProfilePage').then(m => ({ default: m.StudentProfilePage })));
const StudentHistoryPage = lazy(() => import('../pages/student/StudentHistoryPage').then(m => ({ default: m.StudentHistoryPage })));
const StudentAchievementsPage = lazy(() => import('../pages/student/StudentAchievementsPage').then(m => ({ default: m.StudentAchievementsPage })));

// ── Faculty Pages ─────────────────────────────────────────────────────────────
const FacultyDashboard = lazy(() => import('../pages/faculty/FacultyDashboard').then(m => ({ default: m.FacultyDashboard })));
const FacultyStudentsPage = lazy(() => import('../pages/faculty/FacultyStudentsPage').then(m => ({ default: m.FacultyStudentsPage })));
const FacultyStudentDetailsPage = lazy(() => import('../pages/faculty/FacultyStudentDetailsPage').then(m => ({ default: m.FacultyStudentDetailsPage })));
const FacultyManualRegisterPage = lazy(() => import('../pages/faculty/FacultyManualRegisterPage').then(m => ({ default: m.FacultyManualRegisterPage })));
const FacultyWaitlistPage = lazy(() => import('../pages/faculty/FacultyWaitlistPage').then(m => ({ default: m.FacultyWaitlistPage })));
const FacultyEventsPage = lazy(() => import('../pages/faculty/FacultyEventsPage').then(m => ({ default: m.FacultyEventsPage })));
const FacultyApprovalsPage = lazy(() => import('../pages/faculty/FacultyApprovalsPage').then(m => ({ default: m.FacultyApprovalsPage })));
const FacultyRegistrationsPage = lazy(() => import('../pages/faculty/FacultyRegistrationsPage').then(m => ({ default: m.FacultyRegistrationsPage })));
const FacultyAttendancePage = lazy(() => import('../pages/faculty/FacultyAttendancePage').then(m => ({ default: m.FacultyAttendancePage })));
const FacultyNotificationsPage = lazy(() => import('../pages/faculty/FacultyNotificationsPage').then(m => ({ default: m.FacultyNotificationsPage })));
const FacultyReportsPage = lazy(() => import('../pages/faculty/FacultyReportsPage').then(m => ({ default: m.FacultyReportsPage })));
const FacultyProfilePage = lazy(() => import('../pages/faculty/FacultyProfilePage').then(m => ({ default: m.FacultyProfilePage })));

// ── Committee Pages ───────────────────────────────────────────────────────────
const CommitteeDashboard = lazy(() => import('../pages/committee/CommitteeDashboard').then(m => ({ default: m.CommitteeDashboard })));
const CommitteeEventPlanningPage = lazy(() => import('../pages/committee/CommitteeEventPlanningPage').then(m => ({ default: m.CommitteeEventPlanningPage })));
const CommitteeEventsPage = lazy(() => import('../pages/committee/CommitteeEventsPage').then(m => ({ default: m.CommitteeEventsPage })));
const CommitteeParticipantsPage = lazy(() => import('../pages/committee/CommitteeParticipantsPage').then(m => ({ default: m.CommitteeParticipantsPage })));
const CommitteeAttendancePage = lazy(() => import('../pages/committee/CommitteeAttendancePage').then(m => ({ default: m.CommitteeAttendancePage })));
const CommitteeAnnouncementsPage = lazy(() => import('../pages/committee/CommitteeAnnouncementsPage').then(m => ({ default: m.CommitteeAnnouncementsPage })));
const CommitteeReportsPage = lazy(() => import('../pages/committee/CommitteeReportsPage').then(m => ({ default: m.CommitteeReportsPage })));
const CommitteeProfilePage = lazy(() => import('../pages/committee/CommitteeProfilePage').then(m => ({ default: m.CommitteeProfilePage })));

// ── Admin Pages ───────────────────────────────────────────────────────────────
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminUsersPage = lazy(() => import('../pages/admin/AdminUsersPage').then(m => ({ default: m.AdminUsersPage })));
const AdminStudentsPage = lazy(() => import('../pages/admin/AdminStudentsPage').then(m => ({ default: m.AdminStudentsPage })));
const AdminFacultyPage = lazy(() => import('../pages/admin/AdminFacultyPage').then(m => ({ default: m.AdminFacultyPage })));
const AdminCommitteePage = lazy(() => import('../pages/admin/AdminCommitteePage').then(m => ({ default: m.AdminCommitteePage })));
const AdminEventsPage = lazy(() => import('../pages/admin/AdminEventsPage').then(m => ({ default: m.AdminEventsPage })));
const AdminApprovalsPage = lazy(() => import('../pages/admin/AdminApprovalsPage').then(m => ({ default: m.AdminApprovalsPage })));
const AdminRegistrationsPage = lazy(() => import('../pages/admin/AdminRegistrationsPage').then(m => ({ default: m.AdminRegistrationsPage })));
const AdminManualRegisterPage = lazy(() => import('../pages/admin/AdminManualRegisterPage').then(m => ({ default: m.AdminManualRegisterPage })));
const AdminWaitlistPage = lazy(() => import('../pages/admin/AdminWaitlistPage').then(m => ({ default: m.AdminWaitlistPage })));
const AdminAttendancePage = lazy(() => import('../pages/admin/AdminAttendancePage').then(m => ({ default: m.AdminAttendancePage })));
const AdminCategoriesPage = lazy(() => import('../pages/admin/AdminCategoriesPage').then(m => ({ default: m.AdminCategoriesPage })));
const AdminClubsPage = lazy(() => import('../pages/admin/AdminClubsPage').then(m => ({ default: m.AdminClubsPage })));
const AdminNotificationsPage = lazy(() => import('../pages/admin/AdminNotificationsPage').then(m => ({ default: m.AdminNotificationsPage })));
const AdminAnalyticsPage = lazy(() => import('../pages/admin/AdminAnalyticsPage').then(m => ({ default: m.AdminAnalyticsPage })));
const AdminReportsPage = lazy(() => import('../pages/admin/AdminReportsPage').then(m => ({ default: m.AdminReportsPage })));
const AdminAuditLogsPage = lazy(() => import('../pages/admin/AdminAuditLogsPage').then(m => ({ default: m.AdminAuditLogsPage })));
const AdminSettingsPage = lazy(() => import('../pages/admin/AdminSettingsPage').then(m => ({ default: m.AdminSettingsPage })));
const AdminProfilePage = lazy(() => import('../pages/admin/AdminProfilePage').then(m => ({ default: m.AdminProfilePage })));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-navy-950">
    <LoadingState message="Loading…" />
  </div>
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ── Public Routes ─────────────────────────────────────────────── */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:eventId" element={<EventDetailsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="clubs" element={<ClubsPage />} />
          <Route path="committees" element={<CommitteesPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* ── Auth Routes ───────────────────────────────────────────────── */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />

        {/* ── Student Routes ─────────────────────────────────────────────── */}
        <Route
          path="student"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['STUDENT']}>
                <StudentLayout />
              </RoleGuard>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="events" element={<StudentEventsPage />} />
          <Route path="events/:eventId" element={<EventDetailsPage />} />
          <Route path="registrations" element={<StudentRegistrationsPage />} />
          <Route path="pass/:registrationId" element={<StudentPassPage />} />
          <Route path="calendar" element={<StudentCalendarPage />} />
          <Route path="notifications" element={<StudentNotificationsPage />} />
          <Route path="history" element={<StudentHistoryPage />} />
          <Route path="achievements" element={<StudentAchievementsPage />} />
          <Route path="profile" element={<StudentProfilePage />} />
        </Route>

        {/* ── Faculty Routes ─────────────────────────────────────────────── */}
        <Route
          path="faculty"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['FACULTY']}>
                <FacultyLayout />
              </RoleGuard>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<FacultyDashboard />} />
          <Route path="students" element={<FacultyStudentsPage />} />
          <Route path="students/:studentId" element={<FacultyStudentDetailsPage />} />
          <Route path="events" element={<FacultyEventsPage />} />
          <Route path="events/:eventId" element={<EventDetailsPage />} />
          <Route path="events/plan" element={<CommitteeEventPlanningPage />} />
          <Route path="approvals" element={<FacultyApprovalsPage />} />
          <Route path="registrations" element={<FacultyRegistrationsPage />} />
          <Route path="manual-register" element={<FacultyManualRegisterPage />} />
          <Route path="waitlist" element={<FacultyWaitlistPage />} />
          <Route path="attendance" element={<FacultyAttendancePage />} />
          <Route path="notifications" element={<FacultyNotificationsPage />} />
          <Route path="reports" element={<FacultyReportsPage />} />
          <Route path="profile" element={<FacultyProfilePage />} />
        </Route>

        {/* ── Committee Routes ───────────────────────────────────────────── */}
        <Route
          path="committee"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['MANAGEMENT_COMMITTEE']}>
                <CommitteeLayout />
              </RoleGuard>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<CommitteeDashboard />} />
          <Route path="events" element={<CommitteeEventsPage />} />
          <Route path="events/:eventId" element={<EventDetailsPage />} />
          <Route path="events/plan" element={<CommitteeEventPlanningPage />} />
          <Route path="participants" element={<CommitteeParticipantsPage />} />
          <Route path="attendance" element={<CommitteeAttendancePage />} />
          <Route path="announcements" element={<CommitteeAnnouncementsPage />} />
          <Route path="notifications" element={<CommitteeAnnouncementsPage />} />
          <Route path="reports" element={<CommitteeReportsPage />} />
          <Route path="profile" element={<CommitteeProfilePage />} />
        </Route>

        {/* ── Admin Routes ───────────────────────────────────────────────── */}
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['ADMIN']}>
                <AdminLayout />
              </RoleGuard>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="students" element={<AdminStudentsPage />} />
          <Route path="faculty" element={<AdminFacultyPage />} />
          <Route path="committee" element={<AdminCommitteePage />} />
          <Route path="events" element={<AdminEventsPage />} />
          <Route path="events/plan" element={<CommitteeEventPlanningPage />} />
          <Route path="approvals" element={<AdminApprovalsPage />} />
          <Route path="registrations" element={<AdminRegistrationsPage />} />
          <Route path="manual-register" element={<AdminManualRegisterPage />} />
          <Route path="waitlist" element={<AdminWaitlistPage />} />
          <Route path="attendance" element={<AdminAttendancePage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="clubs" element={<AdminClubsPage />} />
          <Route path="notifications" element={<AdminNotificationsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
          <Route path="audit-logs" element={<AdminAuditLogsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="profile" element={<AdminProfilePage />} />
        </Route>

        {/* ── Catch-All ─────────────────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
