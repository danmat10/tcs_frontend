import React from "react";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from "@mui/material";
import { useAuthHeader } from "react-auth-kit";
import { handleDeleteDepartment } from "services";

const DepartmentDelete = ({ department, onClose, setState }) => {
    const authHeader = useAuthHeader();

    const handleDelete = async () => {
        const response = await handleDeleteDepartment({
            id: department.id,
            header: { Authorization: authHeader() },
            setState: setState
        });
        if (response) {
            onClose();
        }
    }

    return (
        <>
            <DialogTitle
                style={{ backgroundColor: "#e57373", color: "white" }}
                paragraph
            >
                Excluir Departamento
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Você está prestes a excluir um departamento. Só poderá ser excluído
                    um departamento que não possua nenhum histórico associado.
                </DialogContentText>
                <Typography variant="subtitle1" component="p" style={{ marginTop: 16 }}>
                    Você tem certeza que deseja excluir o departamento <strong>{department.name}</strong>?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleDelete}
                    color="secondary">
                    Excluir
                </Button>
            </DialogActions>
        </>
    );
};

export { DepartmentDelete };