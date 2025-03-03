import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  Description as DocumentIcon,
  People as PeopleIcon,
  Assignment as TaskIcon,
  Notifications as NotificationIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalDocuments: 0,
    totalRelationships: 0,
    recentActivities: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching dashboard data
    setTimeout(() => {
      setStats({
        totalDocuments: 15,
        totalRelationships: 8,
        recentActivities: [
          {
            id: 1,
            type: 'document',
            description: 'New medical report uploaded',
            timestamp: new Date().toISOString()
          },
          {
            id: 2,
            type: 'relationship',
            description: 'New doctor-patient relationship established',
            timestamp: new Date().toISOString()
          },
          {
            id: 3,
            type: 'notification',
            description: 'Appointment reminder: Follow-up check',
            timestamp: new Date().toISOString()
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'document':
        return <DocumentIcon />;
      case 'relationship':
        return <PeopleIcon />;
      case 'task':
        return <TaskIcon />;
      default:
        return <NotificationIcon />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Documents
                </Typography>
                <Typography variant="h3">
                  {stats.totalDocuments}
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Active Relationships
                </Typography>
                <Typography variant="h3">
                  {stats.totalRelationships}
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ mt: 3 }}>
            <Box p={3}>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              <List>
                {stats.recentActivities.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem>
                      <ListItemIcon>
                        {getActivityIcon(activity.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.description}
                        secondary={new Date(activity.timestamp).toLocaleString()}
                      />
                    </ListItem>
                    {index < stats.recentActivities.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ mt: 3 }}>
            <Box p={3}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <DocumentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Upload New Document" />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Manage Relationships" />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemIcon>
                    <TaskIcon />
                  </ListItemIcon>
                  <ListItemText primary="View Tasks" />
                </ListItem>
              </List>
            </Box>
          </Paper>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ mt: 3 }}>
            <Box p={3}>
              <Typography variant="h6" gutterBottom>
                Notifications
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <NotificationIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Document Review Required"
                    secondary="New medical report needs your attention"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <NotificationIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Profile Update"
                    secondary="Please complete your profile information"
                  />
                </ListItem>
              </List>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 