import {
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
    Box,
    Container,
    Button,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import React, {useState} from "react";

export const Form = (props) => {
    const {setIsFormFufilled, modifySystem} = props;
    const [sexe, setSexe] = useState('')
    const [age, setAge] = useState(0)
    const [taille, setTaille] = useState(0)
    const [poids, setPoids] = useState(0)
    const [nbEntrainement, setNbEntrainement] = useState(0)
    const [objectif, setObjectif] = useState('')
    const caracteristics = [sexe, age, taille, poids, nbEntrainement,objectif]
    const handleSubmit = (event) => {
        event.preventDefault()
        setIsFormFufilled(true)
        caracteristics.some(x => x === ""|0|"Choisir") ? alert("Veuillez remplir tous les champs") : modifySystem(sexe, age, taille, poids, nbEntrainement,objectif)

    };


    return (
        <div>
            <Container component="main" maxWidth="xs">

                <Paper
                    sx={{
                        m: 3,
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Votre profile
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth

                                    id="age"
                                    label="Age"

                                    type={"number"}

                                    onChange={event => setAge(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="poids"
                                    label="Poids"
                                    name="Poids"
                                    type={"number"}

                                    onChange={event => setPoids(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="taille"

                                    label="taille"
                                    name="taille"
                                    type={"number"}
                                    onChange={event => setTaille(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="nbEntrainement"
                                    label="Nombre d'entrainement par semaine"
                                    name="nbEntrainement"
                                    type={"number"}
                                    onChange={event => setNbEntrainement(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-label">Sexe</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    fullWidth={true}
                                    label="Sexe"
                                    onChange={event => setSexe(event.target.value)}
                                    value={sexe}
                                >

                                    <MenuItem value={"homme"}>Homme</MenuItem>
                                    <MenuItem value={"femme"}>Femme</MenuItem>

                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-label">Objectifs</InputLabel>
                                <Select
                                    fullWidth={true}
                                    label="Sexe"
                                    value={objectif}
                                    onChange={event => setObjectif(event.target.value)}

                                >

                                    <MenuItem value={"sècher"}>sèche</MenuItem>
                                    <MenuItem value={"maintient"}>maintient</MenuItem>
                                    <MenuItem value={"prise de masse"}>prise de masse</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            fullWidth={true}
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Interroger votre coach
                        </Button>

                    </Box>
                </Paper>

            </Container>

        </div>
    );
};
