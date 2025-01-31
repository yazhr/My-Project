import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Button,
  ThemeProvider,
  createTheme,
  Paper,
} from "@mui/material";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Light Theme with Improved Text Contrast
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
    background: { default: "#f5f5f5", paper: "#ffffff" },
    text: { primary: "#000000", secondary: "#333333" },
  },
});

const AdminDashboard = () => {
  const [ads, setAds] = useState([]);
  const [queries, setQueries] = useState([]);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAds();
    fetchQueries();
    fetchClients();
  }, []);

  const fetchAds = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/admin/ads", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAds(response.data.ads);
    } catch (err) {
      setError("Failed to fetch ads. Please try again.");
    }
  };

  const fetchQueries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/chat");
      setQueries(response.data.queries);
    } catch (err) {
      setError("Failed to fetch chat queries. Please try again.");
    }
  };

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/ads/admin/clients", {
        headers: { Authorization: `Bearer ${token} `},
      });
      setClients(response.data.clients);
    } catch (err) {
      console.error("Failed to fetch clients", err);
      setError("Failed to fetch clients.");
    }
  };

  const handleAdStatus = async (adId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/ads/admin/ad/${adId}`,
        { status },
        { headers: { Authorization: `Bearer ${token} `} }
      );
      fetchAds(); // Refresh the list after status update
    } catch (err) {
      console.error("Failed to update ad status", err);
      setError("Failed to update ad status.");
    }
  };


  const activeAds = ads.filter((ad) => ad.status === "approved");
  const expiredAds = ads.filter((ad) => new Date(ad.expiryDate) < new Date());

  // Analytics Data for Visualization
  const adStatusData = [
    { name: "Approved", value: ads.filter((ad) => ad.status === "approved").length },
    { name: "Pending", value: ads.filter((ad) => ad.status === "pending").length },
    { name: "Rejected", value: ads.filter((ad) => ad.status === "rejected").length },
  ];

  const adsPerClient = clients.map((client) => ({
    name: client.name,
    ads: client.adCount,
  }));

  return (
    <ThemeProvider theme={lightTheme}>
      <Container>
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          {error && <Typography color="error">{error}</Typography>}

          {/* Total Ads Count */}
          <Paper sx={{ p: 3, mt: 2, textAlign: "center", backgroundColor: "#eeeeee" }}>
            <Typography variant="h5">Total Ads Posted: {ads.length}</Typography>
          </Paper>

          {/* Ad Status Distribution (Pie Chart) */}
         

          {/* Ads Per Client (Bar Chart) */}
          <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
            Ads per Client
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={adsPerClient}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ads" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>

          <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
  Ads Overview
</Typography>
<Table>
  <TableHead sx={{ backgroundColor: "#eeeeee" }}>
    <TableRow>
      <TableCell>ID</TableCell>
      <TableCell>Title</TableCell>
      <TableCell>Description</TableCell>
      <TableCell>Status</TableCell>
      <TableCell>Actions</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {ads.map((ad) => (
      <TableRow key={ad._id}>
        <TableCell>{ad._id}</TableCell>
        <TableCell>{ad.title}</TableCell>
        <TableCell>{ad.description}</TableCell>
        <TableCell>
          <Typography
            sx={{
              color:
                ad.status === "approved"
                  ? "green"
                  : ad.status === "rejected"
                  ? "red"
                  : "orange", // Pending color
            }}
          >
            {ad.status || "approved"} 
          </Typography>
        </TableCell>
        <TableCell>
          {ad.status === "pending" ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAdStatus(ad._id, "approved")}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ ml: 1 }}
                onClick={() => handleAdStatus(ad._id, "rejected")}
              >
                Reject
              </Button>
            </>
          ) : (
            <Typography sx={{ color: "gray" }}>No Actions</Typography>
          )}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>



          {/* Chat Queries Table */}
          <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
            User Chat Queries
          </Typography>
          <Table>
            <TableHead sx={{ backgroundColor: "#eeeeee" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Query</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queries.map((query) => (
                <TableRow key={query._id}>
                  <TableCell>{query._id}</TableCell>
                  <TableCell>{query.name}</TableCell>
                  <TableCell>{query.email}</TableCell>
                  <TableCell>{query.question}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AdminDashboard;