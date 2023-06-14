const express = require("express");
const cors = require("cors");
const pool = require("./database/db");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    const query = `
        SELECT p.id,
               p.name,
               p.username,
               p.country,
               p.age,
               p.game,
               p.level,
               p.is_professional                                                                          AS "isProfessional",
               json_build_object('team', p.team, 'earnings', p.earnings)                                  AS professional,
               json_agg(json_build_object('id', ps.id, 'platform', ps.platform, 'url', ps.url))           AS social
        FROM players p
        LEFT JOIN player_social ps ON p.id = ps.player_id
        GROUP BY p.id
        ORDER BY p.id;
    `;

    pool.query(query, (err, result) => {
        if (err) {
            console.error("Error executing query", err);
            res.status(500).json({ error: "An error occurred" });
        } else {
            res.json(result.rows);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});
