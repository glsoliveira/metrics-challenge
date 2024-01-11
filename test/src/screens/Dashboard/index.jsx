// Importing necessary modules and components from React, React Router, and other libraries
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchDashboardData } from "../../services/api";
import { Grid } from "@material-ui/core";

import "chartjs-plugin-datalabels";
import { createChartData, chartOptions } from "./../../ultils/chartUtils";
import {
  calculateTotal,
  calculateCTR,
  formatNumber,
} from "./../../ultils/dataUtils";
import { FilterControl } from "./../../components/FilterControl";
import { MetricCard } from "./../../components/MetricCard";
import { ChartCard } from "./../../components/ChartCard";
import styles from "./styles.module.css";

export const Dashboard = () => {
  // Extracting campaign ID (cid) from URL parameters
  const { cid } = useParams();
  // Accessing location object to get campaign name from router state
  const location = useLocation();
  const campaignName = location.state?.campaignName;

  // State declarations for dashboard data and UI control
  const [data, setData] = useState({});
  const [number, setNumber] = useState(0);
  const [impressionsHistory, setImpressionsHistory] = useState([]);
  const [clicksHistory, setClicksHistory] = useState([]);
  const [usersHistory, setUsersHistory] = useState([]);
  const [ctrHistory, setCtrHistory] = useState([]);
  const [filterOption, setFilterOption] = useState("all");
  const [customValue, setCustomValue] = useState(0);
  const [totalImpressions, setTotalImpressions] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [averageCtr, setAverageCtr] = useState("N/A");
  const [totalUsers, setTotalUsers] = useState(0);

  // Callback for filtering data based on selected filter option
  const filterData = useCallback(
    (history) => {
      switch (filterOption) {
        case "mostRecent":
          return history.slice(-7);
        case "custom":
          return history.slice(-customValue);
        case "all":
        default:
          return history;
      }
    },
    [filterOption, customValue]
  );

  // Memoized function to update chart data based on the filtered data
  const updateChartData = useMemo(() => {
    const filteredImpressions = filterData(impressionsHistory);
    const filteredClicks = filterData(clicksHistory);
    const filteredUsers = filterData(usersHistory);
    const filteredCtr = filterData(ctrHistory);

    return {
      impressionsData: createChartData(
        filteredImpressions,
        "Impressions History",
        campaignName
      ),
      clicksData: createChartData(
        filteredClicks,
        "Clicks History",
        campaignName
      ),
      usersData: createChartData(filteredUsers, "Users History", campaignName),
      ctrData: createChartData(filteredCtr, "CTR History", campaignName),
    };
  }, [
    impressionsHistory,
    clicksHistory,
    usersHistory,
    ctrHistory,
    filterData,
    campaignName,
  ]);

  // Extracting chart data from memoized object
  const { impressionsData, clicksData, usersData, ctrData } = updateChartData;

  // Effect hook to load saved data from localStorage on component mount
  useEffect(() => {
    const loadSavedData = () => {
      const savedData = JSON.parse(
        localStorage.getItem(`dashboardData-${cid}`)
      );
      if (savedData) {
        setNumber(savedData.number);
        setImpressionsHistory(savedData.impressionsHistory || []);
        setClicksHistory(savedData.clicksHistory || []);
        setUsersHistory(savedData.usersHistory || []);
        setCtrHistory(savedData.ctrHistory || []);
      }
    };

    loadSavedData();
  }, [
    cid,
    setNumber,
    setImpressionsHistory,
    setClicksHistory,
    setUsersHistory,
    setCtrHistory,
  ]);

  // Callback for applying filters based on the filter type
  const applyFilter = useCallback(
    (filterType, value = 7) => {
      let filteredImpressions, filteredClicks, filteredUsers, filteredCtr;

      switch (filterType) {
        case "mostRecent":
          filteredImpressions = impressionsHistory.slice(-value);
          filteredClicks = clicksHistory.slice(-value);
          filteredUsers = usersHistory.slice(-value);
          filteredCtr = ctrHistory.slice(-value);
          break;
        case "custom":
          filteredImpressions = impressionsHistory.slice(-value);
          filteredClicks = clicksHistory.slice(-value);
          filteredUsers = usersHistory.slice(-value);
          filteredCtr = ctrHistory.slice(-value);
          break;
        case "all":
        default:
          filteredImpressions = impressionsHistory;
          filteredClicks = clicksHistory;
          filteredUsers = usersHistory;
          filteredCtr = ctrHistory;
          break;
      }

      updateTotals(
        filteredImpressions,
        filteredClicks,
        filteredUsers,
        filteredCtr
      );
    },
    [impressionsHistory, clicksHistory, usersHistory, ctrHistory]
  );

  // Callback for handling custom value changes in the filter
  const handleCustomValueChange = useCallback(
    (event) => {
      const newValue = Number(event.target.value);
      setCustomValue(newValue);
      if (newValue > 0) {
        setFilterOption("custom");
        applyFilter("custom", newValue);
      }
    },
    [setCustomValue, setFilterOption, applyFilter]
  );

  // Callback for handling filter option changes
  const handleFilterChange = useCallback(
    (event) => {
      const selectedOption = event.target.value;
      setFilterOption(selectedOption);
      applyFilter(selectedOption);
    },
    [setFilterOption, applyFilter]
  );

  // Callback for updating data when new data is fetched
  const updateData = useCallback(
    (newData) => {
      setData(newData);
      setImpressionsHistory((prev) => [...prev, newData.impressions]);
      setClicksHistory((prev) => [...prev, newData.clicks]);
      setUsersHistory((prev) => [...prev, newData.users]);
      const newCtr = calculateCTR(newData.clicks, newData.impressions);
      setCtrHistory((prev) => [...prev, newCtr.toFixed(2)]);
      setNumber((prevNumber) => prevNumber + 1);

      // Saving updated data to localStorage
      const dashboardData = {
        number: number + 1,
        impressionsHistory: [...impressionsHistory, newData.impressions],
        clicksHistory: [...clicksHistory, newData.clicks],
        usersHistory: [...usersHistory, newData.users],
        ctrHistory: [...ctrHistory, newCtr.toFixed(2)],
      };

      localStorage.setItem(
        `dashboardData-${cid}`,
        JSON.stringify(dashboardData)
      );
    },
    [
      setData,
      setImpressionsHistory,
      setClicksHistory,
      setUsersHistory,
      setCtrHistory,
      setNumber,
      number,
      impressionsHistory,
      clicksHistory,
      usersHistory,
      ctrHistory,
      cid,
      applyFilter,
    ]
  );

  // Effect hook for fetching data at regular intervals
  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      try {
        const data = await fetchDashboardData(cid, number);
        updateData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    if (filterOption === "all") {
      intervalId = setInterval(fetchData, 5000);
    }

    return () => clearInterval(intervalId);
  }, [cid, number, filterOption, updateData]);

  // Callback for updating total metrics
  const updateTotals = useCallback(
    (impressions, clicks, users, ctr) => {
      setTotalImpressions(impressions.reduce((acc, value) => acc + value, 0));
      setTotalClicks(clicks.reduce((acc, value) => acc + value, 0));
      setAverageCtr(
        ctr.length > 0
          ? (
              ctr.reduce((acc, value) => acc + parseFloat(value), 0) /
              ctr.length
            ).toFixed(2)
          : "N/A"
      );
      setTotalUsers(users.reduce((acc, value) => acc + value, 0));
    },
    [setTotalImpressions, setTotalClicks, setAverageCtr, setTotalUsers]
  );

  // Render method for the Dashboard component
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.filterContainer}>
        <FilterControl
          filterOption={filterOption}
          handleFilterChange={handleFilterChange}
          handleCustomValueChange={handleCustomValueChange}
          customValue={customValue}
          campaignName={campaignName}
        />
      </div>
      {/* Metric cards displaying various metrics like total impressions, clicks, etc. */}
      <Grid
        container
        direction="column"
        spacing={2}
        className={styles.metricGrid}
      >
        <MetricCard
          title="Current Number"
          value={formatNumber(number)}
          campaignName={campaignName}
        />
        <MetricCard
          title="Total Impressions"
          value={formatNumber(
            filterOption === "custom" || filterOption === "mostRecent"
              ? totalImpressions
              : calculateTotal(impressionsHistory)
          )}
          campaignName={campaignName}
        />
        <MetricCard
          title="Total Clicks"
          value={formatNumber(
            filterOption === "custom" || filterOption === "mostRecent"
              ? totalClicks
              : calculateTotal(clicksHistory)
          )}
          campaignName={campaignName}
        />
        <MetricCard
          title="CTR"
          value={
            filterOption === "custom" || filterOption === "mostRecent"
              ? `${averageCtr}%`
              : `${calculateCTR(
                  calculateTotal(clicksHistory),
                  calculateTotal(impressionsHistory)
                ).toFixed(2)}%`
          }
          campaignName={campaignName}
        />
        <MetricCard
          title="Total Users"
          value={formatNumber(
            filterOption === "custom" || filterOption === "mostRecent"
              ? totalUsers
              : calculateTotal(usersHistory)
          )}
          campaignName={campaignName}
        />
      </Grid>

      {/* Chart cards displaying graphical data for impressions, clicks, etc. */}
      <Grid container spacing={3} className={styles.chartGrid}>
        <ChartCard title="Most Recent Impressions" data={impressionsData} />
        <ChartCard title="Most Recent Clicks" data={clicksData} />
        <ChartCard title="Most Recent CTR" data={ctrData} />
        <ChartCard title="Most Recent Users" data={usersData} />
      </Grid>
    </div>
  );
};
