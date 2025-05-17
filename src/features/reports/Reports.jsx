import React, { useState, useEffect } from 'react';
import './Reports.scss';

function Reports() {
  const [selectedReport, setSelectedReport] = useState('borrowed-books');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);
  const [recentReports, setRecentReports] = useState([]);

  // Örnek rapor türleri
  const reportTypes = [
    { id: 'borrowed-books', name: 'Borrowed Books Report', icon: '📊', description: 'Summary of all borrowed books with details of borrowers' },
    { id: 'overdue-books', name: 'Overdue Books Report', icon: '⚠️', description: 'List of all books that are currently overdue' },
    { id: 'member-activity', name: 'Member Activity Report', icon: '👥', description: 'Activity summary of all library members' },
    { id: 'inventory', name: 'Library Inventory Report', icon: '📚', description: 'Complete inventory of all books in the library' },
    { id: 'financial', name: 'Financial Report', icon: '💰', description: 'Summary of all financial transactions' },
    { id: 'popular-books', name: 'Popular Books Report', icon: '🌟', description: 'Analysis of most borrowed books by category' }
  ];

  // Sayfa yüklendiğinde örnek önceki raporları yükle
  useEffect(() => {
    // API'den önceki raporları yükleyecek, şimdilik örnek veri kullanıyoruz
    const exampleReports = [
      { 
        id: 1, 
        type: 'borrowed-books', 
        name: 'Borrowed Books Report - March 2024', 
        date: '2024-03-15T14:30:00',
        format: 'PDF',
        createdBy: 'Admin'
      },
      { 
        id: 2, 
        type: 'member-activity', 
        name: 'Member Activity Report - February 2024', 
        date: '2024-02-28T10:15:00',
        format: 'Excel',
        createdBy: 'Admin'
      },
      { 
        id: 3, 
        type: 'inventory', 
        name: 'Library Inventory Report - Q1 2024', 
        date: '2024-03-31T09:20:00',
        format: 'PDF',
        createdBy: 'Admin'
      },
      { 
        id: 4, 
        type: 'financial', 
        name: 'Financial Report - February 2024', 
        date: '2024-02-29T16:45:00',
        format: 'PDF',
        createdBy: 'Admin'
      }
    ];
    
    setRecentReports(exampleReports);
  }, []);

  // Rapor oluşturma işlemini başlat
  const handleGenerateReport = (preview = false) => {
    if (!dateRange.startDate || !dateRange.endDate) {
      alert('Please select both start and end dates');
      return;
    }
    
    setLoading(true);
    
    // API'ye rapor oluşturma isteği gönderecek, şimdilik setTimeout ile simüle ediyoruz
    setTimeout(() => {
      const reportData = {
        type: selectedReport,
        name: `${reportTypes.find(r => r.id === selectedReport).name} - Custom Date Range`,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        generatedAt: new Date().toISOString(),
        preview: preview
      };
      
      setGeneratedReport(reportData);
      setLoading(false);
      
      // Önizleme değilse, yeni raporu son raporlar listesine ekle
      if (!preview) {
        const newReport = {
          id: recentReports.length + 1,
          type: selectedReport,
          name: `${reportTypes.find(r => r.id === selectedReport).name} - Custom Date`,
          date: new Date().toISOString(),
          format: 'PDF',
          createdBy: 'Admin'
        };
        
        setRecentReports([newReport, ...recentReports]);
      }
    }, 2000);
  };

  // Rapor türü değiştiğinde önizlemeyi temizle
  const handleReportTypeChange = (reportId) => {
    setSelectedReport(reportId);
    setGeneratedReport(null);
  };

  // Rapor indir işlemini simüle et
  const handleDownloadReport = (reportId) => {
    alert(`Downloading report with ID: ${reportId}`);
  };

  // Tarihleri temizle
  const handleClearDates = () => {
    setDateRange({
      startDate: '',
      endDate: ''
    });
    setGeneratedReport(null);
  };

  // Kullanıcı dostu tarih formatı
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>Report Generator</h1>
        <p>Create detailed reports for your library management needs</p>
      </div>

      <div className="report-form">
        <div className="form-group">
          <label>Select Report Type</label>
          <div className="report-types-grid">
            {reportTypes.map(report => (
              <div 
                key={report.id}
                className={`report-type-card ${selectedReport === report.id ? 'selected' : ''}`}
                onClick={() => handleReportTypeChange(report.id)}
              >
                <div className="report-icon">{report.icon}</div>
                <div className="report-info">
                  <h3>{report.name}</h3>
                  <p>{report.description}</p>
                </div>
                {selectedReport === report.id && (
                  <div className="selected-indicator"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Date Range</label>
          <div className="date-inputs">
            <div className="date-input-group">
              <label htmlFor="start-date">Start Date</label>
              <input 
                id="start-date"
                type="date" 
                value={dateRange.startDate}
                onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                max={dateRange.endDate || undefined}
              />
            </div>
            <div className="date-input-group">
              <label htmlFor="end-date">End Date</label>
              <input 
                id="end-date"
                type="date" 
                value={dateRange.endDate}
                onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                min={dateRange.startDate || undefined}
              />
            </div>
            {(dateRange.startDate || dateRange.endDate) && (
              <button 
                className="clear-dates-btn"
                onClick={handleClearDates}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button 
            className="preview-btn"
            onClick={() => handleGenerateReport(true)}
            disabled={!selectedReport || !dateRange.startDate || !dateRange.endDate || loading}
          >
            {loading ? <span className="loading-spinner-sm"></span> : 'Preview Report'}
          </button>
          <button 
            className="generate-btn"
            onClick={() => handleGenerateReport(false)}
            disabled={!selectedReport || !dateRange.startDate || !dateRange.endDate || loading}
          >
            {loading ? <span className="loading-spinner-sm"></span> : 'Generate & Download PDF'}
          </button>
        </div>
      </div>

      {generatedReport && (
        <div className="report-preview">
          <div className="preview-header">
            <h2>{generatedReport.preview ? 'Report Preview' : 'Generated Report'}</h2>
            <div className="preview-meta">
              <span className="preview-type">{reportTypes.find(r => r.id === generatedReport.type).icon} {reportTypes.find(r => r.id === generatedReport.type).name}</span>
              <span className="preview-dates">{formatDate(generatedReport.startDate)} - {formatDate(generatedReport.endDate)}</span>
            </div>
          </div>
          
          <div className="preview-content">
            {/* Burada gerçek rapor içeriği gösterilecek, şimdilik simüle ediyoruz */}
            <div className="preview-placeholder">
              <p>This is a preview of your report content.</p>
              <p>In a real implementation, the actual report data would be displayed here.</p>
              <div className="preview-sample-data">
                <div className="sample-chart"></div>
                <div className="sample-table">
                  <div className="sample-row header">
                    <div className="sample-cell">Title</div>
                    <div className="sample-cell">Author</div>
                    <div className="sample-cell">Status</div>
                    <div className="sample-cell">Date</div>
                  </div>
                  {[...Array(5)].map((_, index) => (
                    <div className="sample-row" key={index}>
                      <div className="sample-cell">Sample Book Title</div>
                      <div className="sample-cell">Author Name</div>
                      <div className="sample-cell">Borrowed</div>
                      <div className="sample-cell">2024-03-15</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {generatedReport.preview && (
            <div className="preview-actions">
              <button 
                className="generate-btn"
                onClick={() => handleGenerateReport(false)}
                disabled={loading}
              >
                {loading ? <span className="loading-spinner-sm"></span> : 'Generate & Download Full Report'}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="recent-reports">
        <h2>Recent Reports</h2>
        {recentReports.length === 0 ? (
          <div className="no-reports">
            <p>No reports have been generated yet.</p>
          </div>
        ) : (
          <div className="report-list">
            {recentReports.map((report) => (
              <div className="report-item" key={report.id}>
                <div className="report-info">
                  <h4>
                    {reportTypes.find(r => r.id === report.type)?.icon} {report.name}
                  </h4>
                  <p>Generated on: {formatDate(report.date)}</p>
                  <div className="report-meta">
                    <span className="report-format">{report.format}</span>
                    <span className="report-author">by {report.createdBy}</span>
                  </div>
                </div>
                <button 
                  className="download-btn"
                  onClick={() => handleDownloadReport(report.id)}
                >
                  <span className="material-symbols-outlined">download</span>
                  Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;