const express = require("express");
const fs = require("fs");
const xml2js = require("xml2js");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(bodyParser.json());

// Đọc dữ liệu từ tệp XML
function readXML(callback) {
  fs.readFile("data.xml", "utf-8", (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    xml2js.parseString(data, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    });
  });
}

// Ghi dữ liệu vào tệp XML
function writeXML(data, callback) {
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(data);
  fs.writeFile("data.xml", xml, (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

// Thêm một mục mới vào file XML
app.post("/create", (req, res) => {
  const { id, artist, title, timeCreate, content } = req.body;
  if (!id || !artist || !title || !timeCreate || !content) {
    res.status(400).send("Bad Request");
    return;
  }

  // Đọc dữ liệu từ file XML
  fs.readFile("data.xml", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }

    xml2js.parseString(data, (err, result) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }

      if (!result.posts) {
        result.posts = { post: [] };
      }

      const isExist = result.posts.post.some((post) => post.id[0] == id);
      if (isExist) {
        res.status(400).json({ error: "ID is exist" });
        return;
      }

      const newItem = {
        id: id,
        artist: artist,
        title: title,
        timeCreate: timeCreate,
        content: content,
      };

      result.posts.post.push(newItem);

      const builder = new xml2js.Builder();
      const xml = builder.buildObject(result);

      fs.writeFile("data.xml", xml, (err) => {
        if (err) {
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
        res.json({
          message: "Create new item successfully",
          data: newItem,
        });
      });
    });
  });
});

app.get("/read", (req, res) => {
  readXML((err, data) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }

    // Biến đổi dữ liệu
    const transformedData = data.posts.post.map((post) => {
      return {
        id: post.id[0],
        artist: post.artist[0],
        title: post.title[0],
        timeCreate: post.timeCreate[0],
        content: post.content[0],
      };
    });

    // Gửi dữ liệu đã biến đổi
    res.json(transformedData);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
