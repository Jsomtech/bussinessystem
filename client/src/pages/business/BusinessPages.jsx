import StatCard from '../../components/StatCard';
import ModulePage from '../../components/ModulePage';

export function Overview() {
  return (
    <ModulePage title="Overview" description="A snapshot of your business today.">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Today's Sales" value="$0" />
        <StatCard label="Today's Profit" value="$0" />
        <StatCard label="Outstanding Debt" value="$0" />
        <StatCard label="Stock Value" value="$0" />
        <StatCard label="Expenses" value="$0" />
      </div>
    </ModulePage>
  );
}

export const Sales = () => <ModulePage title="Sales" description="New sales, history, invoices, returns and reports." />;
export const Purchases = () => <ModulePage title="Purchases" description="Purchase orders, returns and supplier payments." />;
export const Products = () => <ModulePage title="Products" description="Catalog with SKU, barcode, pricing, variants and images." />;
export const Inventory = () => <ModulePage title="Inventory" description="Stock in/out, adjustments, transfers, history and valuation." />;
export const Customers = () => <ModulePage title="Customers" description="Customer accounts, credit and statements." />;
export const Suppliers = () => <ModulePage title="Suppliers" description="Supplier accounts and balances." />;
export const Credit = () => <ModulePage title="Credit & Loans" description="Customer and supplier debt, aging and reminders." />;
export const Expenses = () => <ModulePage title="Expenses" description="Track business expenses by category." />;
export const Employees = () => <ModulePage title="Employees" description="Staff, roles and permissions." />;
export const POS = () => <ModulePage title="POS" description="Point of sale with barcode and EVC checkout." />;
export const Payments = () => <ModulePage title="Payments" description="Cash, EVC, bank and card payments." />;
export const Reports = () => <ModulePage title="Reports" description="Sales, profit, stock and debt reports." />;
export const SMS = () => <ModulePage title="SMS" description="Templates, reminders and delivery history." />;
export const Notifications = () => <ModulePage title="Notifications" description="In-app alerts across your business." />;
export const Settings = () => <ModulePage title="Settings" description="Business profile, branding and preferences." />;
