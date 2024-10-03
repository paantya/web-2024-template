import { useState } from "react";
import styled from "styled-components";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

interface Movie {
  title: string;
  description: string;
  rating: number;
  preview: string; // URL для превью
}

const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const movies: Movie[] = [
  { title: "Адамовы яблоки", description: "Произвольное описание фильма.", rating: 7.5, preview: "https://via.placeholder.com/150" },
  { title: "Оставленные 2023", description: "Произвольное описание фильма.", rating: 8.0, preview: "https://via.placeholder.com/150" },
  { title: "Рождество опять", description: "Произвольное описание фильма.", rating: 6.5, preview: "https://via.placeholder.com/150" },
  { title: "Красота по-американски", description: "Произвольное описание фильма.", rating: 8.3, preview: "https://via.placeholder.com/150" },
  { title: "Перл", description: "Произвольное описание фильма.", rating: 7.0, preview: "https://via.placeholder.com/150" },
  { title: "Джо экзотик (Король тигров)", description: "Произвольное описание фильма.", rating: 8.5, preview: "https://via.placeholder.com/150" },
  { title: "Мэнди", description: "Произвольное описание фильма.", rating: 7.8, preview: "https://via.placeholder.com/150" },
  { title: "Новые парни Турбо", description: "Произвольное описание фильма.", rating: 6.0, preview: "https://via.placeholder.com/150" },
  { title: "Битлджус", description: "Произвольное описание фильма.", rating: 8.1, preview: "https://via.placeholder.com/150" },
  { title: "Салтберн", description: "Произвольное описание фильма.", rating: 7.2, preview: "https://via.placeholder.com/150" },
  { title: "Ромми и Мишель (🤢)", description: "Произвольное описание фильма.", rating: 6.3, preview: "https://via.placeholder.com/150" },
  { title: "Смерть Сталина", description: "Произвольное описание фильма.", rating: 8.0, preview: "https://via.placeholder.com/150" },
  { title: "Новейший завет", description: "Произвольное описание фильма.", rating: 7.4, preview: "https://via.placeholder.com/150" },
  { title: "Следствие по делу гражданина вне всяких подозрений", description: "Произвольное описание фильма.", rating: 7.9, preview: "https://via.placeholder.com/150" },
  { title: "Бедные несчастные", description: "Произвольное описание фильма.", rating: 6.8, preview: "https://via.placeholder.com/150" },
  { title: "Стальная хватка", description: "Произвольное описание фильма.", rating: 7.6, preview: "https://via.placeholder.com/150" },
  { title: "Реальные упыри", description: "Произвольное описание фильма.", rating: 7.1, preview: "https://via.placeholder.com/150" },
  { title: "Кролик Джоджо", description: "Произвольное описание фильма.", rating: 8.0, preview: "https://via.placeholder.com/150" },
  { title: "Фрэнк (2013)", description: "Произвольное описание фильма.", rating: 7.3, preview: "https://via.placeholder.com/150" },
  { title: "Наполеон Динамит", description: "Произвольное описание фильма.", rating: 6.9, preview: "https://via.placeholder.com/150" },
  { title: "Манкимен", description: "Произвольное описание фильма.", rating: 7.4, preview: "https://via.placeholder.com/150" },
  { title: "Славные парни", description: "Произвольное описание фильма.", rating: 8.5, preview: "https://via.placeholder.com/150" },
  { title: "Трилогия Властелин Колец", description: "Произвольное описание фильма.", rating: 9.0, preview: "https://via.placeholder.com/150" },
  { title: "Как Витька Чеснок вёз Лёху Штыря в дом инвалидов", description: "Произвольное описание фильма.", rating: 7.2, preview: "https://via.placeholder.com/150" },
  { title: "Последний император", description: "Произвольное описание фильма.", rating: 8.1, preview: "https://via.placeholder.com/150" },
  { title: "Середина 90-х", description: "Произвольное описание фильма.", rating: 7.5, preview: "https://via.placeholder.com/150" },
  { title: "Любовь истекает кровью", description: "Произвольное описание фильма.", rating: 6.7, preview: "https://via.placeholder.com/150" },
  { title: "Образцовый самец", description: "Произвольное описание фильма.", rating: 6.4, preview: "https://via.placeholder.com/150" },
  { title: "Ка-Пекс", description: "Произвольное описание фильма.", rating: 7.8, preview: "https://via.placeholder.com/150" },
  { title: "Максин", description: "Произвольное описание фильма.", rating: 7.0, preview: "https://via.placeholder.com/150" },
  { title: "Бартон Финк", description: "Произвольное описание фильма.", rating: 7.9, preview: "https://via.placeholder.com/150" },
  { title: "Собиратель душ", description: "Произвольное описание фильма.", rating: 6.6, preview: "https://via.placeholder.com/150" },
  { title: "Американское чтиво", description: "Произвольное описание фильма.", rating: 8.9, preview: "https://via.placeholder.com/150" },
  { title: "Солнцестояние", description: "Произвольное описание фильма.", rating: 7.4, preview: "https://via.placeholder.com/150" },
  { title: "Плутовство", description: "Произвольное описание фильма.", rating: 6.8, preview: "https://via.placeholder.com/150" },
  { title: "Аероплан", description: "Произвольное описание фильма.", rating: 7.2, preview: "https://via.placeholder.com/150" },
  { title: "Сумерки", description: "Произвольное описание фильма.", rating: 5.5, preview: "https://via.placeholder.com/150" },
];

function App() {
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleClickOpen = (movie: Movie) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMovie(null);
  };

  return (
    <AppContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        Киноклуб
      </Typography>
      <List>
        {movies.map((movie, index) => (
          <ListItem key={index}>
            <ListItemText primary={movie.title} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="info" onClick={() => handleClickOpen(movie)}>
                <InfoIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedMovie?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{selectedMovie?.description}</Typography>
          <Typography variant="body2">Рейтинг: {selectedMovie?.rating}</Typography>
          <img src={selectedMovie?.preview} alt={selectedMovie?.title} style={{ width: "100%", borderRadius: "8px" }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </AppContainer>
  );
}

export default App;