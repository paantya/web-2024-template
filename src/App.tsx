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
  { title: "Адамовы яблоки", description: "Комедия о преступниках, которые открывают для себя смысл жизни.", rating: 7.5, preview: "https://via.placeholder.com/150" },
  { title: "Оставленные 2023", description: "Фантастический триллер о выживании после апокалипсиса.", rating: 8.0, preview: "https://via.placeholder.com/150" },
  { title: "Рождество опять", description: "Семейная комедия о том, как одно Рождество может повторяться снова и снова.", rating: 6.5, preview: "https://via.placeholder.com/150" },
  { title: "Красота по-американски", description: "Драма о жизни среднего американца, который ищет счастье.", rating: 8.3, preview: "https://via.placeholder.com/150" },
  { title: "Перл", description: "История о любви и потере, которая меняет жизнь.", rating: 7.0, preview: "https://via.placeholder.com/150" },
  { title: "Джо экзотик (Король тигров)", description: "Документальный сериал о жизни и приключениях Джо Экзотика.", rating: 8.5, preview: "https://via.placeholder.com/150" },
  { title: "Мэнди", description: "Культовый фильм о мести и любви, который погружает в мир безумия.", rating: 7.8, preview: "https://via.placeholder.com/150" },
  { title: "Новые парни Турбо", description: "Комедия о том, как старые друзья снова собираются вместе.", rating: 6.0, preview: "https://via.placeholder.com/150" },
  { title: "Битлджус", description: "Комедия о призраках, которые пытаются изгнать новых жильцов из своего дома.", rating: 8.1, preview: "https://via.placeholder.com/150" },
  { title: "Салтберн", description: "Драма о жизни в маленьком городке и его жителях.", rating: 7.2, preview: "https://via.placeholder.com/150" },
  { title: "Ромми и Мишель (🤢)", description: "Комедия о двух подругах, которые пытаются произвести впечатление на своих одноклассников.", rating: 6.3, preview: "https://via.placeholder.com/150" },
  { title: "Смерть Сталина", description: "Черная комедия о борьбе за власть после смерти Сталина.", rating: 8.0, preview: "https://via.placeholder.com/150" },
  { title: "Новейший завет", description: "Фантастическая комедия о том, что происходит, когда Бог живет в Брюсселе.", rating: 7.4, preview: "https://via.placeholder.com/150" },
  { title: "Следствие по делу гражданина вне всяких подозрений", description: "Детективный фильм о расследовании загадочного преступления.", rating: 7.9, preview: "https://via.placeholder.com/150" },
  { title: "Бедные несчастные", description: "Комедия о том, как неудачи могут привести к неожиданным результатам.", rating: 6.8, preview: "https://via.placeholder.com/150" },
  { title: "Стальная хватка", description: "Драма о мести и справедливости в мире преступности.", rating: 7.6, preview: "https://via.placeholder.com/150" },
  { title: "Реальные упыри", description: "Комедия о вампирах, которые живут среди нас.", rating: 7.1, preview: "https://via.placeholder.com/150" },
  { title: "Кролик Джоджо", description: "Сатирическая комедия о мальчике, который дружит с воображаемым другом - Гитлером.", rating: 8.0, preview: "https://via.placeholder.com/150" },
  { title: "Фрэнк (2013)", description: "Драма о музыканте, который носит голову бумажного мешка.", rating: 7.3, preview: "https://via.placeholder.com/150" },
  { title: "Наполеон Динамит", description: "Комедия о неудачливом подростке и его странной семье.", rating: 6.9, preview: "https://via.placeholder.com/150" },
  { title: "Манкимен", description: "Фильм о человеке, который превращается в обезьяну.", rating: 7.4, preview: "https://via.placeholder.com/150" },
  { title: "Славные парни", description: "Криминальная драма о гангстерах и их жизни.", rating: 8.5, preview: "https://via.placeholder.com/150" },
  { title: "Трилогия Властелин Колец", description: "Эпическая история о борьбе добра и зла.", rating: 9.0, preview: "https://via.placeholder.com/150" },
  { title: "Как Витька Чеснок вёз Лёху Штыря в дом инвалидов", description: "Комедия о приключениях двух друзей.", rating: 7.2, preview: "https://via.placeholder.com/150" },
  { title: "Последний император", description: "Историческая драма о последнем императоре Китая.", rating: 8.1, preview: "https://via.placeholder.com/150" },
  { title: "Середина 90-х", description: "Драма о подростках в 90-х годах.", rating: 7.5, preview: "https://via.placeholder.com/150" },
  { title: "Любовь истекает кровью", description: "Романтическая драма о любви и потере.", rating: 6.7, preview: "https://via.placeholder.com/150" },
  { title: "Образцовый самец", description: "Комедия о том, как стать идеальным мужчиной.", rating: 6.4, preview: "https://via.placeholder.com/150" },
  { title: "Ка-Пекс", description: "Фантастическая драма о человеке, который утверждает, что он пришелец.", rating: 7.8, preview: "https://via.placeholder.com/150" },
  { title: "Максин", description: "Триллер о женщине, которая пытается выжить в опасном мире.", rating: 7.0, preview: "https://via.placeholder.com/150" },
  { title: "Бартон Финк", description: "Драма о сценаристе, который сталкивается с творческим кризисом.", rating: 7.9, preview: "https://via.placeholder.com/150" },
  { title: "Собиратель душ", description: "Фильм о человеке, который собирает души.", rating: 6.6, preview: "https://via.placeholder.com/150" },
  { title: "Американское чтиво", description: "Криминальная драма о нескольких переплетенных историях.", rating: 8.9, preview: "https://via.placeholder.com/150" },
  { title: "Солнцестояние", description: "Фильм о культуре и ритуалах.", rating: 7.4, preview: "https://via.placeholder.com/150" },
  { title: "Плутовство", description: "Комедия о мошенниках и их приключениях.", rating: 6.8, preview: "https://via.placeholder.com/150" },
  { title: "Аероплан", description: "Комедия о приключениях в воздухе.", rating: 7.2, preview: "https://via.placeholder.com/150" },
  { title: "Сумерки", description: "Романтический фильм о любви между человеком и вампиром.", rating: 5.5, preview: "https://via.placeholder.com/150" },
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