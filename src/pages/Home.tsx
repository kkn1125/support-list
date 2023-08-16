import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { SyntheticEvent } from "react";
import { useState } from "react";
import Manager, { COMP_TYPE, Data, Support } from "../model/Manager";
import { format } from "../util/tool";

const manager = new Manager();

function Home() {
  const [dataList, setDataList] = useState<Data[]>([]);
  const [data, setData] = useState<Data>({
    comp_name: "",
    comp_purpose: "",
    comp_size: 0,
    comp_type: COMP_TYPE.SI,
    apply_start: +new Date(),
    end_time: +new Date(),
  });

  useEffect(() => {
    setDataList(manager.support.list());
  }, [manager.support.list()]);

  function handleChange(e: SelectChangeEvent | SyntheticEvent) {
    const { name, value } = e.target as unknown as {
      name: string;
      value: string;
    };
    setData((data) => ({ ...data, ...{ [name]: value } }));
  }

  function add() {
    if (!data.comp_name) {
      alert("회사명을 입력하세요.");
      return;
    }
    if (data.comp_size === 0) {
      alert("회사규모를 입력하세요");
      return;
    }

    const newData = new Data(data);
    manager.support.insert(newData);
    manager.support.save();
    setData(() => ({
      comp_name: "",
      comp_purpose: "",
      comp_size: 0,
      comp_type: COMP_TYPE.SI,
      apply_start: +new Date(),
      end_time: +new Date(),
    }));
  }

  return (
    <Box>
      <Typography component='h4' variant='h4' fontWeight={700}>
        📄 Current Storage
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Stack gap={1}>
        <Box
          component='label'
          sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          회사 이름
          <Box sx={{ flex: 1 }}>
            <TextField
              name='comp_name'
              fullWidth
              size='small'
              onChange={handleChange}
              value={data["comp_name"]}
            />
          </Box>
        </Box>
        <Box
          component='label'
          sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          회사 유형
          <Box sx={{ flex: 1 }}>
            <Select
              name='comp_type'
              fullWidth
              size='small'
              defaultValue={"SI"}
              onChange={(e) => handleChange(e as any)}
              value={data["comp_type"] as unknown as string}>
              {[...Object.values(COMP_TYPE)].map((type: string) => (
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
            <TextField
              name='comp_purpose'
              fullWidth
              size='small'
              onChange={handleChange}
              value={data["comp_purpose"]}
            />
          </Box>
        </Box>
        <Box
          component='label'
          sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          회사 규모
          <Box sx={{ flex: 1 }}>
            <TextField
              name='comp_size'
              type='number'
              inputProps={{ min: 1, max: 10_000 }}
              fullWidth
              size='small'
              onChange={handleChange}
              value={data["comp_size"]}
            />
          </Box>
        </Box>
        <Box
          component='label'
          sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          신청 시간
          <Box sx={{ flex: 1 }}>
            <TextField
              name='apply_start'
              type='datetime-local'
              inputProps={{ min: 1, max: 10_000 }}
              fullWidth
              size='small'
              onChange={handleChange}
              value={format(data["apply_start"], "YYYY-MM-ddTHH:mm:ss")}
            />
          </Box>
        </Box>
        <Box
          component='label'
          sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          지원 마감 시간
          <Box sx={{ flex: 1 }}>
            <TextField
              name='end_time'
              type='datetime-local'
              inputProps={{ min: 1, max: 10_000 }}
              fullWidth
              size='small'
              onChange={handleChange}
              value={format(data["end_time"], "YYYY-MM-ddTHH:mm:ss")}
            />
          </Box>
        </Box>
        <Box>
          <Button id='add' variant='contained' color='info' onClick={add}>
            추가
          </Button>
        </Box>
      </Stack>
      <Divider sx={{ my: 5 }} />
      <Typography fontWeight={700} fontSize={24}>
        List
      </Typography>
      <Stack gap={2}>
        {dataList.map((item) => (
          <Stack key={item.id} direction='row' alignItems='center' gap={1}>
            <Typography>{item.comp_name}</Typography>
            <Divider flexItem orientation='vertical' sx={{ mx: 3 }} />
            <Typography>{COMP_TYPE[item.comp_type]}</Typography>
            <Divider flexItem orientation='vertical' sx={{ mx: 3 }} />
            <Typography>{item.comp_purpose}</Typography>
            <Divider flexItem orientation='vertical' sx={{ mx: 3 }} />
            <Typography>{item.comp_size}</Typography>
            <Divider flexItem orientation='vertical' sx={{ mx: 3 }} />
            <Typography>
              {(() => {
                try {
                  return format(item.apply_start, "YYYY-MM-dd HH:ss");
                } catch {
                  return "no time";
                }
              })()}
            </Typography>
            <Divider flexItem orientation='vertical' sx={{ mx: 3 }} />
            <Typography>
              {(() => {
                try {
                  return format(item.end_time, "YYYY-MM-dd HH:ss");
                } catch {
                  return "no time";
                }
              })()}
            </Typography>
            <Button
              variant='contained'
              color='error'
              size='small'
              onClick={() => {
                manager.support.remove(item.id);
                manager.support.save();
                manager.support.load();
              }}>
              삭제
            </Button>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default Home;
