const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./utils/database");
const bodyParser = require("body-parser");
const templeteRoutes = require("./routes/templete");
const userRoutes = require("./routes/userManagement");
const compareCsv = require("./routes/compareCsv");
const Templete = require("./models/TempleteModel/templete");
const MetaData = require("./models/TempleteModel/metadata");
const Files = require("./models/TempleteModel/files");
const PORT = 4000;
const upload = require("./routes/upload");
const path = require("path")
//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

const imageDirectoryPath = path.join(__dirname, "../", "COMPARECSV_FILES", 'OmrImages', "Images_2024-05-04T04-38-30-972Z/005.jpg")
app.use('/images', express.static(imageDirectoryPath));
//all routes
app.use("/users", userRoutes);
app.use(upload);
app.use(compareCsv);
app.use(templeteRoutes);

Templete.hasMany(MetaData);
MetaData.belongsTo(Templete);
Templete.hasMany(Files);
Files.belongsTo(Templete);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
