import {
  Box,
  Divider,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Manager, { COMP_TYPE, Data } from "../model/Manager";

const manager = new Manager();

function Home() {
  useEffect(() => {
    manager.support.load();
    console.log(manager);
    // const data = new Data();
    // data.comp_name = "(주)테스트";
    // data.comp_purpose = "";
    // data.comp_size = 15;
    // data.comp_type = COMP_TYPE.SOL;
    // manager.support.insert(data);
    // manager.support.save();
  }, []);

  function add(name, purpose, size, type) {
    manager.support.insert(data);
  }

  return (
    <Box>
      <Typography component='h4' variant='h4'>
        📄 Current Storage
      </Typography>
      <Stack
        gap={1}
        sx={{
          py: 5,
        }}>
        <Box
          component='label'
          sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          회사 이름
          <Box sx={{ flex: 1 }}>
            <TextField fullWidth size='small' />
          </Box>
        </Box>
        <Box
          component='label'
          sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          회사 유형
          <Box sx={{ flex: 1 }}>
            <Select fullWidth size='small' defaultValue={"SI"}>
              {[...Object.values(COMP_TYPE)]
                .filter((type: number) => isNaN(type))
                .map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
            </Select>
          </Box>
        </Box>
        <Box
          component='label'
          sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          회사 방향
          <Box sx={{ flex: 1 }}>
            <TextField fullWidth size='small' />
          </Box>
        </Box>
        <Box
          component='label'
          sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          회사 규모
          <Box sx={{ flex: 1 }}>
            <TextField
              type='number'
              inputProps={{ min: 1, max: 10_000, defaultValue: 1 }}
              fullWidth
              size='small'
            />
          </Box>
        </Box>
      </Stack>
      <Stack>
        {manager.support.list().map((item) => (
          <Stack key={item.id} direction='row'>
            <Typography>{item.comp_name}</Typography>
            <Divider flexItem orientation='vertical' sx={{ px: 5 }} />
            <Typography>{COMP_TYPE[item.comp_type]}</Typography>
            <Divider flexItem orientation='vertical' sx={{ px: 5 }} />
            <Typography>{item.comp_purpose}</Typography>
            <Divider flexItem orientation='vertical' sx={{ px: 5 }} />
            <Typography>{item.comp_size}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default Home;
