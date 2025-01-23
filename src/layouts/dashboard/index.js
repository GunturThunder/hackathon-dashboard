/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";

// React icons
import { IoIosRocket } from "react-icons/io";
import { IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { lineChartDataDashboard, lineChartDataDashboardAxis, lineChartDataDashboardXL } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;
  const [revenueA, setRevenueA] = useState(0)
  const [revenueB, setRevenueB] = useState(0)
  const [totRevanue, setTotRevenue] = useState(0)
  const [usera, setUsera] = useState({})
  const [userb, setUserb] = useState({})
  useEffect(() => {
    axios({
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      url: 'http://3.88.228.137:80/app_a/products',
    })
      .then(function (response) {
        response.data.map((item, index)=>{
          let price = item.price
          setRevenueA(revenueA+parseInt(price))
        })
        // setRevenueA(response.data)
      });
    axios({
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      url: 'http://3.88.228.137:80/app_a/users',
    })
      .then(function (response) {
        setUsera(response.data)
      });
      //

      axios({
        method: 'get',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        url: 'http://3.88.228.137:80/app_b/products',
      })
        .then(function (response) {
          response.data.map((item, index)=>{
            let price = item.price
            setRevenueB(revenueB+parseInt(price))
          })
        });
      axios({
        method: 'get',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        url: 'http://3.88.228.137:80/app_b/users',
      })
        .then(function (response) {
          setUserb(response.data)
        });
  }, [])

  useEffect(()=>{
    setTotRevenue(revenueB+revenueA)
  })

  return (
    <DashboardLayout>
      <VuiTypography align="center" variant="h4" color="white" fontWeight="bold" mb="5px">
        Customer Unified Multi Touchpoint Al-Driven Dashboard
      </VuiTypography>
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Total Revenue", fontWeight: "regular" }}
                count={'IDR'+totRevanue+'.00'}
                // percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Touch Point Axis", fontWeight: "regular" }}
                count={'IDR'+revenueA+'.00'}
                // percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Touch Point XL" }}
                count={'IDR'+revenueB+'.00'}
                // percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Total Customer", fontWeight: "regular" }}
                count={usera ? usera.length+userb.length:0}
                // percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Touch Point Axis", fontWeight: "regular" }}
                count={usera ?usera.length:0}
                // percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Touch Point XL" }}
                count={userb ? userb.length:0}
                // percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12} xl={12}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Total Revenue All Touch Point
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      +5% more{" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                    <LineChart
                      lineChartData={lineChartDataDashboard}
                      lineChartOptions={lineChartOptionsDashboard}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={6}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Total Revenue Axis
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      +5% more{" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                    <LineChart
                      lineChartData={lineChartDataDashboardAxis}
                      lineChartOptions={lineChartOptionsDashboard}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={6}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Total Revenue XL
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      +5% more{" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                    <LineChart
                      lineChartData={lineChartDataDashboardXL}
                      lineChartOptions={lineChartOptionsDashboard}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Dashboard;
