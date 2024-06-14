
// import { AppBar, Toolbar, Typography } from "@mui/material";
// import Image from "next/image";
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Link from 'next/link';
// import * as React from "react";

// const pages = ['Home', 'Dashboard'];

// const AppBarMenu = () => {
//   return (
//     <AppBar position="static" color="primary" style={{ marginBottom: "40px" }}>
//       <Toolbar>
//         <div style={{ marginRight: '10px', height: '120px', width: '100px', position: 'relative' }}>
//           <Image src="/logo.png" alt="Logo" layout="fill" objectFit="contain" />
//         </div>
//         <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
//           {pages.map((page) => (
//             <Link href={`/${page.toLowerCase()}`} key={page}>
//               <Button sx={{ my: 2, color: 'white', display: 'block' }}>
//                 {page}
//               </Button>
//             </Link>
//           ))}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default AppBarMenu;

import { AppBar, Toolbar } from "@mui/material";
import Image from "next/image";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import * as React from "react";

const pages = ['home', 'dashboard'];

const AppBarMenu = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar style={{ justifyContent: 'space-between' }}>
      <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
          {pages.map((page) => (
            <Link href={`/${page}`} key={page} passHref>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </Button>
            </Link>
          ))}
        </Box>
        <div style={{ marginRight: '10px', height: '120px', width: '160px', position: 'relative' }}>
          <Image src="/logo.png" alt="Logo" layout="fill" objectFit="contain" />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarMenu;


