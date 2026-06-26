import React from 'react';
import { FileText, Download, Filter, Calendar, BarChart3, PieChart } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function Reports() {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Smart Waste Management - Monthly Report', 20, 20);
    doc.setFontSize(12);
    doc.text('Date: March 2026', 20, 30);
    doc.text('Total Waste Collected: 4,250 Tons', 20, 40);
    doc.text('Efficiency: 94.2%', 20, 50);
    doc.save('EcoWaste_Report_March_2026.pdf');
  };

  const reports = [
    { id: 1, title: 'Monthly Waste Summary', date: 'Mar 01, 2026', type: 'Summary', size: '1.2 MB' },
    { id: 2, title: 'Zone-wise Analysis', date: 'Feb 28, 2026', type: 'Analytics', size: '2.4 MB' },
    { id: 3, title: 'Driver Performance Log', date: 'Feb 25, 2026', type: 'Log', size: '850 KB' },
    { id: 4, title: 'Smart Bin Health Report', date: 'Feb 20, 2026', type: 'Maintenance', size: '1.1 MB' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-primary mb-2">Reports & Analytics</h1>
          <p className="text-gray-500 font-medium">Export and analyze waste management performance data.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border text-gray-500 font-bold text-sm rounded-xl hover:bg-muted transition-all">
            <Calendar size={18} className="text-secondary" />
            Custom Range
          </button>
          <button 
            onClick={generatePDF}
            className="swr-button-primary flex items-center gap-2"
          >
            <Download size={20} />
            Generate PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="swr-card flex items-center gap-6 p-8">
          <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl">
            <FileText size={32} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Total Reports</p>
            <p className="text-3xl font-bold text-primary">124</p>
          </div>
        </div>
        <div className="swr-card flex items-center gap-6 p-8">
          <div className="p-4 bg-secondary/5 text-secondary rounded-2xl">
            <BarChart3 size={32} />
          </div>
          <div>
            <p className="text-xs text-secondary font-bold uppercase tracking-wider mb-1">Data Points</p>
            <p className="text-3xl font-bold text-primary">1.2M+</p>
          </div>
        </div>
        <div className="swr-card flex items-center gap-6 p-8">
          <div className="p-4 bg-orange-50 text-orange-500 rounded-2xl">
            <PieChart size={32} />
          </div>
          <div>
            <p className="text-xs text-orange-500 font-bold uppercase tracking-wider mb-1">Storage Used</p>
            <p className="text-3xl font-bold text-primary">45.2 GB</p>
          </div>
        </div>
      </div>

      <div className="swr-card overflow-hidden p-0">
        <div className="p-8 border-b border-border flex items-center justify-between">
          <h3 className="text-xl font-bold text-primary">Recent Reports</h3>
          <div className="flex items-center gap-3 text-gray-400">
            <Filter size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">Sort by Date</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted text-gray-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-8 py-4">Report Name</th>
                <th className="px-8 py-4">Type</th>
                <th className="px-8 py-4">Date Generated</th>
                <th className="px-8 py-4">File Size</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reports.map(report => (
                <tr key={report.id} className="hover:bg-muted transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-muted text-gray-400 rounded-lg group-hover:text-secondary transition-colors">
                        <FileText size={20} />
                      </div>
                      <span className="text-lg font-bold text-primary">{report.title}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="swr-badge bg-primary/5 text-primary">{report.type}</span>
                  </td>
                  <td className="px-8 py-6 text-sm font-medium text-gray-500">{report.date}</td>
                  <td className="px-8 py-6 text-sm font-medium text-gray-500">{report.size}</td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-gray-300 hover:text-secondary transition-colors">
                      <Download size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
