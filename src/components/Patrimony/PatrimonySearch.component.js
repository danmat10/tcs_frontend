import { QrCode2 } from "@mui/icons-material";
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useAuthHeader } from "react-auth-kit";

const PatriomonySearch = ({ setState }) => {
    const authHeader = useAuthHeader();
    const [nmPatrimonio, setNmPatrimonio] = useState("");
    const [fixo, setFixo] = useState("");
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <>
            <Grid item md={12} xs={12}>
                <Typography variant="subtitle1">Pesquisar Patrimônios</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Pesquisar"
                    value={nmPatrimonio}
                    onChange={(e) => setNmPatrimonio(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel id="filter">Filtrar</InputLabel>
                    <Select
                        labelId="filter"
                        label="Filtrar"
                        value={fixo}
                        onChange={(e) => setFixo(e.target.value)}
                    >
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="true">Alocáveis</MenuItem>
                        <MenuItem value="false">Fixos</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => { }}
                >
                    Pesquisar
                </Button>
            </Grid>

            {isMobile && <Grid item xs={12} md={3}
            >
                <Button component="label" variant="outlined" startIcon={<QrCode2 />} fullWidth>
                    Ler Qr Code
                </Button>
            </Grid>}

        </>
    )
}

export { PatriomonySearch }