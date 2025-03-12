const express = require('express');
const pool = require('./db');
const router = express.Router();

router.post('/produtos', async (req, res) => {
  const { nome_produto, preco, qtde_estoque, descricao } = req.body;
  try {
    const timestamp = Date.now() % 1000000;
    const randomNum = Math.floor(Math.random() * 1000);
    const cod_produto = timestamp * 1000 + randomNum;

    const result = await pool.query(
      `INSERT INTO produtos (cod_produto, nome_produto, preco, qtde_estoque, descricao) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [cod_produto, nome_produto, preco, qtde_estoque, descricao]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/produtos/:productId', async (req, res) => {
  const { productId: cod_produto } = req.params;
  const { nome_produto, preco, qtde_estoque, descricao } = req.body;

  try {
    const result = await pool.query(
      `UPDATE produtos SET nome_produto = $2, preco = $3, qtde_estoque = $4, descricao = $5 WHERE cod_produto = $1`,
      [cod_produto, nome_produto, preco, qtde_estoque, descricao]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Produto não encontrado.' });
    } else {
      res.json({ message: 'Produto alterado com sucesso!' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/produtos', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT cod_produto, nome_produto, preco, qtde_estoque, descricao FROM produtos'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/produtos/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const result = await pool.query(
      `SELECT cod_produto, nome_produto, preco, qtde_estoque, descricao FROM produtos WHERE cod_produto = $1`,
      [productId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/produtos/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM produtos WHERE cod_produto = $1`,
      [productId]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Produto não encontrado.' });
    } else {
      res.json({ message: 'Produto excluído com sucesso!' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;