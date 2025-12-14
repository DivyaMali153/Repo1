import Footer from "../Footer"
import Sidebar from "../Sidebar"
import MyTable from "../MyTable"
import { Grid, Paper, styled } from "@mui/material"
import Header from "../Header";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const Layout=()=>{
    return(
        <>
       {/* <div className="row">
        <div className="col-md-2">
        <Sidebar/>
         </div>
         <div className="col-md-7">
        <MyTable/>
        </div>
        <div className="col-md-3"></div>
        </div> */}
       
        <Grid container spacing={2}>
  
  <Grid size={12} height={60} >
 <Header/>
  </Grid>
  
  <Grid size={3} height={500} >
<Sidebar/>
  </Grid>
  <Grid size={9} height={500} >
  <MyTable/>
  </Grid>
  <Grid size={3} height={500} border={'1px solid' }>
    this ih ehader  {/* <Item><Sidebar/></Item> */}
  </Grid>
  <Grid size={3} height={500} border={'1px solid' }>
    this ih ehader  {/* <Item><Sidebar/></Item> */}
  </Grid>
  <Grid size={3} height={500} border={'1px solid' }>
    this ih ehader  {/* <Item><Sidebar/></Item> */}
  </Grid>
  <Grid size={3} height={500} border={'1px solid' }>
    this ih ehader  {/* <Item><Sidebar/></Item> */}
  </Grid>
  
</Grid>
<Footer/>


        </>
    )
}

export default Layout