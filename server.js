import express from 'express';
import routes from './server/routes/routes';

const app = express();

app.use(express.json());

app.use(routes);

app.get('/*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'This is not the page you are looking for check well the route or method',
  });
});

// app.post('/*', (req, res) => {
//   res.status(404).json({
//     status: 404,
//     error: 'This is not the page you are looking for check well the route or method',
//   });
// });

// app.put('/*', (req, res) => {
//   res.status(404).json({
//     status: 404,
//     error: 'This is not the page you are looking for check well the route or method',
//   });
// });

// app.patch('/*', (req, res) => {
//   res.status(404).json({
//     status: 404,
//     error: 'This is not the page you are looking for check well the route or method',
//   });
// });

// app.delete('/*', (req, res) => {
//   res.status(404).json({
//     status: 404,
//     error: 'This is not the page you are looking for check well the route or method',
//   });
// });

// app.copy('/*', (req, res) => {
//   res.status(404).json({
//     status: 404,
//     error: 'This is not the page you are looking for check well the route or method',
//   });
// });

// app.link('/*', (req, res) => {
//   res.status(404).json({
//     status: 404,
//     error: 'This is not the page you are looking for check well the route or method',
//   });
// });

// app.unlink('/*', (req, res) => {
//   res.status(404).json({
//     status: 404,
//     error: 'This is not the page you are looking for check well the route or method',
//   });
// });

// app.purge('/*', (req, res) => {
//   res.status(404).json({
//     status: 404,
//     error: 'This is not the page you are looking for check well the route or method',
//   });
// });

// app.lock('/*', (req, res) => {
//   res.status(404).json({
//     status: 404,
//     error: 'This is not the page you are looking for check well the route or method',
//   });
// });

// app.unlock('/*', (req, res) => {
//   res.status(404).json({
//     status: 404,
//     error: 'This is not the page you are looking for check well the route or method',
//   });
// });

// app.propfind('/*', (req, res) => {
//   res.status(404).json({
//     status: 404,
//     error: 'This is not the page you are looking for check well the route or method',
//   });
// });

const port = process.env.PORT || 3005;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});

module.exports = app;
