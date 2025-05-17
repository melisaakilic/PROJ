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
  PointElement,
  RadialLinearScale,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Line, Radar } from 'react-chartjs-2';
import './Dashboard.scss';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Dashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalMembers: 0,
    activeLoans: 0,
    overdueBorrowing: 0
  });
  const [timeFrame, setTimeFrame] = useState('month');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call with different data based on timeFrame
    setLoading(true);
    setTimeout(() => {
      const statsData = {
        week: {
          totalBooks: 1250,
          totalMembers: 856,
          activeLoans: 245,
          overdueBorrowing: 15,
          growth: 3
        },
        month: {
          totalBooks: 1250,
          totalMembers: 856,
          activeLoans: 245,
          overdueBorrowing: 15,
          growth: 12
        },
        year: {
          totalBooks: 1250,
          totalMembers: 856,
          activeLoans: 245,
          overdueBorrowing: 15,
          growth: 34
        }
      };

      setStats(statsData[timeFrame]);
      setLoading(false);
    }, 1000);
  }, [timeFrame]);

  // Chart data for activity
  const activityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Books Borrowed',
        data: [120, 190, 300, 250, 210, 290],
        backgroundColor: 'rgba(183, 194, 156, 0.8)',
        borderRadius: 6,
      },
      {
        label: 'Books Returned',
        data: [100, 170, 280, 240, 200, 270],
        backgroundColor: 'rgba(27, 27, 27, 0.7)',
        borderRadius: 6,
      },
    ],
  };

  // Chart data for categories
  const categoryData = {
    labels: ['Fiction', 'Science', 'History', 'Biography', 'Self-Help', 'Other'],
    datasets: [
      {
        data: [300, 180, 200, 150, 100, 80],
        backgroundColor: [
          'rgba(183, 194, 156, 0.8)',
          'rgba(27, 27, 27, 0.7)',
          'rgba(183, 194, 156, 0.6)',
          'rgba(27, 27, 27, 0.5)',
          'rgba(183, 194, 156, 0.4)',
          'rgba(27, 27, 27, 0.3)',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Chart data for member activity by day
  const memberActivityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Member Activity',
        data: [65, 59, 90, 81, 56, 55, 40],
        backgroundColor: 'rgba(183, 194, 156, 0.2)',
        borderColor: 'rgba(183, 194, 156, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(183, 194, 156, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(183, 194, 156, 1)',
        pointRadius: 4,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Chart data for popular books radar
  const popularBooksData = {
    labels: ['Fiction', 'Science', 'History', 'Biography', 'Self-Help', 'Business'],
    datasets: [
      {
        label: 'Popularity Score',
        data: [90, 75, 60, 85, 70, 55],
        backgroundColor: 'rgba(183, 194, 156, 0.2)',
        borderColor: 'rgba(183, 194, 156, 1)',
        pointBackgroundColor: 'rgba(183, 194, 156, 1)',
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            family: 'Nunito',
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Library Activity (Last 6 Months)',
        font: {
          family: 'Nunito',
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(27, 27, 27, 0.8)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        cornerRadius: 6,
        titleFont: {
          family: 'Nunito',
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          family: 'Nunito',
          size: 13
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            family: 'Nunito',
            size: 12
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Nunito',
            size: 12
          }
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            family: 'Nunito',
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Book Categories',
        font: {
          family: 'Nunito',
          size: 16,
          weight: 'bold'
        }
      }
    },
    cutout: '65%'
  };

  const recentActivities = [
    {
      id: 1,
      type: 'add',
      title: 'New Book Added',
      description: '"The Great Gatsby" added to collection',
      time: '2 hours ago',
      status: 'Completed'
    },
    {
      id: 2,
      type: 'user',
      title: 'New Member Registration',
      description: 'John Doe registered',
      time: '5 hours ago',
      status: 'Completed'
    },
    {
      id: 3,
      type: 'return',
      title: 'Book Returned',
      description: '"1984" returned by Sarah Smith',
      time: '1 day ago',
      status: 'Completed'
    },
    {
      id: 4,
      type: 'overdue',
      title: 'Overdue Notice',
      description: 'Reminder sent to Mike Johnson',
      time: '2 days ago',
      status: 'Pending'
    }
  ];

  const iconMap = {
    add: 'library_add',
    user: 'person_add',
    return: 'keyboard_return',
    overdue: 'notification_important'
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>Error Loading Dashboard</h2>
        <p>{error}</p>
        <button className="btn" onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container fade-in">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Library Dashboard</h1>
          <p>Get an overview of your library's performance</p>
        </div>
        <div className="time-filter">
          <button 
            className={`filter-btn ${timeFrame === 'week' ? 'active' : ''}`} 
            onClick={() => setTimeFrame('week')}
          >
            Weekly
          </button>
          <button 
            className={`filter-btn ${timeFrame === 'month' ? 'active' : ''}`} 
            onClick={() => setTimeFrame('month')}
          >
            Monthly
          </button>
          <button 
            className={`filter-btn ${timeFrame === 'year' ? 'active' : ''}`} 
            onClick={() => setTimeFrame('year')}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(183, 194, 156, 0.2)' }}>
            <span className="material-symbols-outlined">auto_stories</span>
          </div>
          <div className="stat-content">
            <h3>Total Books</h3>
            <p className="stat-value">{stats.totalBooks.toLocaleString()}</p>
            <span className="stat-change positive">+{stats.growth}% from last {timeFrame}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(27, 27, 27, 0.1)' }}>
            <span className="material-symbols-outlined">people</span>
          </div>
          <div className="stat-content">
            <h3>Total Members</h3>
            <p className="stat-value">{stats.totalMembers.toLocaleString()}</p>
            <span className="stat-change positive">+12% from last {timeFrame}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(183, 194, 156, 0.2)' }}>
            <span className="material-symbols-outlined">menu_book</span>
          </div>
          <div className="stat-content">
            <h3>Active Loans</h3>
            <p className="stat-value">{stats.activeLoans.toLocaleString()}</p>
            <span className="stat-change neutral">No change</span>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon" style={{ background: 'rgba(244, 67, 54, 0.1)' }}>
            <span className="material-symbols-outlined">warning</span>
          </div>
          <div className="stat-content">
            <h3>Overdue Items</h3>
            <p className="stat-value">{stats.overdueBorrowing.toLocaleString()}</p>
            <span className="stat-change negative">+2 from yesterday</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card wide">
          <div className="card-header">
            <h2>Library Activity</h2>
            <div className="card-actions">
              <button className="action-btn">
                <span className="material-symbols-outlined">download</span>
              </button>
              <button className="action-btn">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>
          <div className="card-body chart">
            <Bar data={activityData} options={chartOptions} />
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Book Categories</h2>
            <div className="card-actions">
              <button className="action-btn">
                <span className="material-symbols-outlined">download</span>
              </button>
            </div>
          </div>
          <div className="card-body chart">
            <Doughnut data={categoryData} options={doughnutOptions} />
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Member Activity</h2>
            <div className="card-actions">
              <button className="action-btn">
                <span className="material-symbols-outlined">download</span>
              </button>
            </div>
          </div>
          <div className="card-body chart">
            <Line 
              data={memberActivityData} 
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: 'Weekly Member Activity'
                  }
                }
              }} 
            />
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Popular Categories</h2>
            <div className="card-actions">
              <button className="action-btn">
                <span className="material-symbols-outlined">download</span>
              </button>
            </div>
          </div>
          <div className="card-body chart">
            <Radar 
              data={popularBooksData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  r: {
                    angleLines: {
                      color: 'rgba(0, 0, 0, 0.1)'
                    },
                    grid: {
                      color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                      font: {
                        family: 'Nunito',
                        size: 12
                      }
                    },
                    ticks: {
                      backdropColor: 'transparent',
                      font: {
                        family: 'Nunito',
                        size: 10
                      }
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }} 
            />
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Recent Activities</h2>
            <div className="card-actions">
              <button className="view-all-btn">View All</button>
            </div>
          </div>
          <div className="card-body">
            <div className="activity-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.type}`}>
                    <span className="material-symbols-outlined">{iconMap[activity.type]}</span>
                  </div>
                  <div className="activity-content">
                    <h3>{activity.title}</h3>
                    <p>{activity.description}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                  <div className={`activity-status ${activity.status.toLowerCase()}`}>
                    {activity.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="card-body">
            <div className="quick-actions">
              <button className="quick-action-btn">
                <span className="material-symbols-outlined">add_circle</span>
                Add New Book
              </button>
              <button className="quick-action-btn">
                <span className="material-symbols-outlined">person_add</span>
                Register Member
              </button>
              <button className="quick-action-btn">
                <span className="material-symbols-outlined">swap_horiz</span>
                Record Borrow
              </button>
              <button className="quick-action-btn">
                <span className="material-symbols-outlined">file_download</span>
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;