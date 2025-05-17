import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  LineElement,
  PointElement
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import './Analytics.scss';

// ChartJS bileşenlerini kaydet
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

function Analytics() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);

  // Simüle edilmiş veri yükleme
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Gerçek projede API'den veri çekimi yapılacak
      // Şimdi simüle ediyoruz
      setTimeout(() => {
        const data = {
          overview: {
            totalBooks: 1250,
            totalAuthors: 460,
            totalBorrowings: 3560,
            activeLoans: 245,
            overdueBorrowings: 15,
            mostBorrowedCategories: [
              { name: 'Fiction', count: 560 },
              { name: 'Science', count: 320 },
              { name: 'History', count: 240 },
              { name: 'Biography', count: 180 },
              { name: 'Self-Help', count: 120 },
              { name: 'Other', count: 140 }
            ],
            monthlyBorrows: [
              { month: 'Jan', borrows: 120, returns: 100 },
              { month: 'Feb', borrows: 190, returns: 170 },
              { month: 'Mar', borrows: 300, returns: 280 },
              { month: 'Apr', borrows: 250, returns: 240 },
              { month: 'May', borrows: 210, returns: 200 },
              { month: 'Jun', borrows: 290, returns: 270 }
            ],
            topBooks: [
              { title: 'To Kill a Mockingbird', borrowCount: 58 },
              { title: '1984', borrowCount: 47 },
              { title: 'The Great Gatsby', borrowCount: 42 },
              { title: 'Pride and Prejudice', borrowCount: 39 },
              { title: 'The Catcher in the Rye', borrowCount: 36 }
            ]
          },
          borrowing: {
            dailyAverage: 18,
            weeklyTrend: [
              { day: 'Mon', count: 25 },
              { day: 'Tue', count: 20 },
              { day: 'Wed', count: 22 },
              { day: 'Thu', count: 18 },
              { day: 'Fri', count: 24 },
              { day: 'Sat', count: 12 },
              { day: 'Sun', count: 8 }
            ],
            returnRate: 92, // yüzde
            overdueRate: 4, // yüzde
            averageBorrowTime: 14 // gün
          },
          users: {
            activeUsers: 320,
            newUsers: 45,
            userGrowth: [
              { month: 'Jan', users: 250 },
              { month: 'Feb', users: 275 },
              { month: 'Mar', users: 290 },
              { month: 'Apr', users: 305 },
              { month: 'May', users: 320 },
              { month: 'Jun', users: 350 }
            ],
            userActivity: {
              veryActive: 110, // Haftada 3+ ödünç alma
              active: 145, // Haftada 1-2 ödünç alma
              occasional: 180, // Ayda 1-3 ödünç alma
              inactive: 95 // Son 3 ayda hiç ödünç almama
            }
          }
        };
        
        setAnalyticsData(data);
        setLoading(false);
      }, 1500);
    };
    
    loadData();
  }, [timeRange]);

  // Kategori grafiği verileri
  const categoryChartData = {
    labels: analyticsData?.overview.mostBorrowedCategories.map(cat => cat.name) || [],
    datasets: [
      {
        data: analyticsData?.overview.mostBorrowedCategories.map(cat => cat.count) || [],
        backgroundColor: [
          '#2563eb',
          '#7c3aed',
          '#f59e0b',
          '#10b981',
          '#ef4444',
          '#6b7280',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Kategori grafiği seçenekleri
  const categoryChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      },
      title: {
        display: true,
        text: 'Book Categories Distribution',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    cutout: '60%'
  };

  // Aylık ödünç alma grafiği verileri
  const monthlyBorrowsData = {
    labels: analyticsData?.overview.monthlyBorrows.map(item => item.month) || [],
    datasets: [
      {
        label: 'Books Borrowed',
        data: analyticsData?.overview.monthlyBorrows.map(item => item.borrows) || [],
        backgroundColor: '#2563eb',
        borderColor: '#2563eb',
        borderWidth: 2,
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Books Returned',
        data: analyticsData?.overview.monthlyBorrows.map(item => item.returns) || [],
        backgroundColor: '#10b981',
        borderColor: '#10b981',
        borderWidth: 2,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  // Aylık ödünç alma grafiği seçenekleri
  const monthlyBorrowsOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
        }
      },
      title: {
        display: true,
        text: 'Monthly Library Activity',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        cornerRadius: 6,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    }
  };

  // Haftalık ödünç alma grafiği verileri
  const weeklyTrendData = {
    labels: analyticsData?.borrowing.weeklyTrend.map(item => item.day) || [],
    datasets: [
      {
        label: 'Daily Borrows',
        data: analyticsData?.borrowing.weeklyTrend.map(item => item.count) || [],
        backgroundColor: '#2563eb',
        borderRadius: 6,
      },
    ],
  };

  // Haftalık ödünç alma grafiği seçenekleri
  const weeklyTrendOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Weekly Borrowing Trend',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    }
  };
  
  // Kullanıcı büyüme grafiği verileri
  const userGrowthData = {
    labels: analyticsData?.users.userGrowth.map(item => item.month) || [],
    datasets: [
      {
        label: 'Active Users',
        data: analyticsData?.users.userGrowth.map(item => item.users) || [],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Kullanıcı büyüme grafiği seçenekleri
  const userGrowthOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'User Growth Trend',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    }
  };

  // Kullanıcı aktivitesi grafiği verileri
  const userActivityData = {
    labels: ['Very Active', 'Active', 'Occasional', 'Inactive'],
    datasets: [
      {
        data: analyticsData?.users.userActivity 
          ? [
              analyticsData.users.userActivity.veryActive,
              analyticsData.users.userActivity.active,
              analyticsData.users.userActivity.occasional,
              analyticsData.users.userActivity.inactive
            ] 
          : [],
        backgroundColor: [
          '#10b981',  // yeşil
          '#2563eb',  // mavi
          '#f59e0b',  // turuncu
          '#6b7280',  // gri
        ],
        borderWidth: 0,
      },
    ],
  };

  // Kullanıcı aktivitesi grafiği seçenekleri
  const userActivityOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 20,
        }
      },
      title: {
        display: true,
        text: 'User Activity Distribution',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    cutout: '50%'
  };

  // Yükleme animasyonu
  if (loading) {
    return (
      <div className="analytics-loading">
        <div className="loading-spinner"></div>
        <p>Loading analytics data...</p>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>Library Analytics</h1>
        <p>Insights and trends from your library data</p>
        
        <div className="analytics-actions">
          <div className="tabs">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'borrowing' ? 'active' : ''}`}
              onClick={() => setActiveTab('borrowing')}
            >
              Borrowing Metrics
            </button>
            <button 
              className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              User Metrics
            </button>
          </div>
          
          <div className="time-filter">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="time-select"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="tab-content overview-tab">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#dbeafe' }}>📚</div>
              <div className="stat-content">
                <h3>Total Books</h3>
                <p className="stat-value">{analyticsData.overview.totalBooks}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#fef3c7' }}>✍️</div>
              <div className="stat-content">
                <h3>Total Authors</h3>
                <p className="stat-value">{analyticsData.overview.totalAuthors}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#d1fae5' }}>📖</div>
              <div className="stat-content">
                <h3>Active Loans</h3>
                <p className="stat-value">{analyticsData.overview.activeLoans}</p>
              </div>
            </div>

            <div className="stat-card warning">
              <div className="stat-icon" style={{ background: '#fee2e2' }}>⚠️</div>
              <div className="stat-content">
                <h3>Overdue Items</h3>
                <p className="stat-value">{analyticsData.overview.overdueBorrowings}</p>
              </div>
            </div>
          </div>

          <div className="chart-grid">
            <div className="chart-card">
              <h3>Monthly Activity</h3>
              <div className="chart-container">
                <Line data={monthlyBorrowsData} options={monthlyBorrowsOptions} />
              </div>
            </div>
            
            <div className="chart-card">
              <h3>Category Distribution</h3>
              <div className="chart-container">
                <Doughnut data={categoryChartData} options={categoryChartOptions} />
              </div>
            </div>
          </div>

          <div className="top-books-section">
            <h3>Top Borrowed Books</h3>
            <div className="top-books-list">
              {analyticsData.overview.topBooks.map((book, index) => (
                <div className="top-book-item" key={index}>
                  <div className="book-rank">{index + 1}</div>
                  <div className="book-info">
                    <h4>{book.title}</h4>
                    <p>{book.borrowCount} borrows</p>
                  </div>
                  <div className="book-indicator" style={{ width: `${(book.borrowCount / analyticsData.overview.topBooks[0].borrowCount) * 100}%` }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'borrowing' && (
        <div className="tab-content borrowing-tab">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#dbeafe' }}>📊</div>
              <div className="stat-content">
                <h3>Daily Average</h3>
                <p className="stat-value">{analyticsData.borrowing.dailyAverage}</p>
                <span className="stat-label">borrows per day</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#d1fae5' }}>🔄</div>
              <div className="stat-content">
                <h3>Return Rate</h3>
                <p className="stat-value">{analyticsData.borrowing.returnRate}%</p>
                <span className="stat-label">books returned on time</span>
              </div>
            </div>

            <div className="stat-card warning">
              <div className="stat-icon" style={{ background: '#fee2e2' }}>⚠️</div>
              <div className="stat-content">
                <h3>Overdue Rate</h3>
                <p className="stat-value">{analyticsData.borrowing.overdueRate}%</p>
                <span className="stat-label">books returned late</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#fef3c7' }}>⏱️</div>
              <div className="stat-content">
                <h3>Average Time</h3>
                <p className="stat-value">{analyticsData.borrowing.averageBorrowTime}</p>
                <span className="stat-label">days per borrow</span>
              </div>
            </div>
          </div>

          <div className="chart-grid">
            <div className="chart-card full-width">
              <h3>Weekly Borrowing Trend</h3>
              <div className="chart-container">
                <Bar data={weeklyTrendData} options={weeklyTrendOptions} />
              </div>
            </div>
          </div>

          <div className="borrowing-insights">
            <h3>Borrowing Insights</h3>
            <div className="insights-grid">
              <div className="insight-card">
                <h4>Peak Borrowing Day</h4>
                <p className="insight-value">Monday</p>
                <p className="insight-desc">Most books are borrowed at the beginning of the week</p>
              </div>
              <div className="insight-card">
                <h4>Most Active Time</h4>
                <p className="insight-value">3:00 PM - 5:00 PM</p>
                <p className="insight-desc">Busiest hours in the library</p>
              </div>
              <div className="insight-card">
                <h4>Seasonal Trend</h4>
                <p className="insight-value">+15% in Summer</p>
                <p className="insight-desc">Borrowing increases during summer months</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="tab-content users-tab">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#dbeafe' }}>👥</div>
              <div className="stat-content">
                <h3>Active Members</h3>
                <p className="stat-value">{analyticsData.users.activeUsers}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#d1fae5' }}>✨</div>
              <div className="stat-content">
                <h3>New Members</h3>
                <p className="stat-value">{analyticsData.users.newUsers}</p>
                <span className="stat-label">this month</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#fef3c7' }}>📈</div>
              <div className="stat-content">
                <h3>Growth Rate</h3>
                <p className="stat-value">9.4%</p>
                <span className="stat-label">from last month</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#fee2e2' }}>⭐</div>
              <div className="stat-content">
                <h3>Member Satisfaction</h3>
                <p className="stat-value">4.8/5</p>
                <span className="stat-label">based on surveys</span>
              </div>
            </div>
          </div>

          <div className="chart-grid">
            <div className="chart-card">
              <h3>User Growth</h3>
              <div className="chart-container">
                <Line data={userGrowthData} options={userGrowthOptions} />
              </div>
            </div>
            
            <div className="chart-card">
              <h3>User Activity</h3>
              <div className="chart-container">
                <Doughnut data={userActivityData} options={userActivityOptions} />
              </div>
            </div>
          </div>

          <div className="user-demographics">
            <h3>Member Demographics</h3>
            <div className="demographics-grid">
              <div className="demographic-card">
                <h4>Age Distribution</h4>
                <div className="demographics-bars">
                  <div className="demographic-bar-group">
                    <div className="demographic-label">Under 18</div>
                    <div className="demographic-bar-wrapper">
                      <div className="demographic-bar" style={{ width: '15%' }}></div>
                      <span className="demographic-value">15%</span>
                    </div>
                  </div>
                  <div className="demographic-bar-group">
                    <div className="demographic-label">18-24</div>
                    <div className="demographic-bar-wrapper">
                      <div className="demographic-bar" style={{ width: '28%' }}></div>
                      <span className="demographic-value">28%</span>
                    </div>
                  </div>
                  <div className="demographic-bar-group">
                    <div className="demographic-label">25-34</div>
                    <div className="demographic-bar-wrapper">
                      <div className="demographic-bar" style={{ width: '32%' }}></div>
                      <span className="demographic-value">32%</span>
                    </div>
                  </div>
                  <div className="demographic-bar-group">
                    <div className="demographic-label">35-44</div>
                    <div className="demographic-bar-wrapper">
                      <div className="demographic-bar" style={{ width: '18%' }}></div>
                      <span className="demographic-value">18%</span>
                    </div>
                  </div>
                  <div className="demographic-bar-group">
                    <div className="demographic-label">45+</div>
                    <div className="demographic-bar-wrapper">
                      <div className="demographic-bar" style={{ width: '7%' }}></div>
                      <span className="demographic-value">7%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;