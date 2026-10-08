import StatCard from '../../components/StatCard';
import ModulePage from '../../components/ModulePage';
import ResourcePage from '../../components/ResourcePage';

export function AdminDashboard() {
  return (
    <ModulePage title="Admin Dashboard" description="Platform-wide health at a glance.">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Businesses" value="0" />
        <StatCard label="Active" value="0" />
        <StatCard label="MRR" value="$0" />
        <StatCard label="Users" value="0" />
      </div>
    </ModulePage>
  );
}

export const Businesses = () => (
  <ResourcePage title="Businesses" description="Manage all tenant workspaces."
    endpoint="/admin/businesses"
    columns={[{ key: 'name', label: 'Name' }, { key: 'type', label: 'Type' }, { key: 'phone', label: 'Phone' }, { key: 'created_at', label: 'Joined' }]}
    fields={[{ key: 'name', label: 'Name', required: true }, { key: 'type', label: 'Type' }, { key: 'phone', label: 'Phone' }, { key: 'email', label: 'Email' }]} />
);
export const Users = () => <ModulePage title="Users" description="Platform users across businesses." />;
export const Subscriptions = () => <ModulePage title="Subscriptions" description="Plans, status and renewals." />;
export const Plans = () => <ModulePage title="Plans" description="Free, Starter, Business, Enterprise pricing and features." />;
export const AdminPayments = () => <ModulePage title="Payments" description="Subscription payments and failed charges." />;
export const AdminSMS = () => <ModulePage title="SMS" description="Platform SMS usage and provider health." />;
export const Analytics = () => <ModulePage title="System Analytics" description="Growth, activation and churn metrics." />;
export const Tickets = () => <ModulePage title="Support Tickets" description="Customer support queue." />;
export const AdminNotifications = () => <ModulePage title="Notifications" description="Platform announcements." />;
export const AuditLogs = () => <ModulePage title="Audit Logs" description="Who changed what, when." />;
export const Config = () => <ModulePage title="Platform Configuration" description="Global settings and feature flags." />;
