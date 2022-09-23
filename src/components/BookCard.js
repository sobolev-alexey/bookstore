import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const cardStyles = makeStyles({
  root: {
    minWidth: '50%',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function BookCard({ books }) {
  const classes = cardStyles();

  return (
    <>
      {books?.map((book, index) => {
        return (
          <Card
            key={book?.isbn || `${book?.title}-${index}`}
            className={classes.root}
          >
            <CardContent>
              <img src={book?.cover} alt={book?.title} width={128} />
              <Typography variant="h5" component="h2">
                {book?.title}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {book?.author}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {book?.isbn}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {book?.description}
              </Typography>
              {book?.ratingsCount && book?.averageRating && (
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {book?.averageRating} ({book?.ratingsCount})
                </Typography>
              )}
              {book?.listPrice?.amount && (
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {new Intl.NumberFormat(book?.country, {
                    style: 'currency',
                    currency: book?.listPrice?.currencyCode,
                  }).format(book?.listPrice?.amount)}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button size="small">Book in detail</Button>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
}

export default BookCard;
