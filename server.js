const express = require('express')

const pool = require('./db')

const PORT = process.env.PORT || '3000'

const app = express()

app.use(express.json())

app.post(('/produtos'), async (req, res) => {
  const { nome_produto, preco, qtde_estoque } = req.body
  try {
    const timestamp = Date.now() % 1000000
    const randomNum = Math.floor(Math.random() * 1000)
    const cod_produto = timestamp * 1000 + randomNum

    const result = await pool.query(`INSERT INTO produtos (cod_produto, nome_produto, preco, qtde_estoque) VALUES ($1, $2, $3, $4) RETURNING*`,[cod_produto, nome_produto, preco, qtde_estoque])

    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put(('/produtos/:productId'), async (req, res) => {
  const { productId: cod_produto } = req.params
  const { nome_produto, preco, qtde_estoque, descricao } = req.body

  try {
    const result = await pool.query(`UPDATE produtos SET cod_produto = $1, nome_produto = $2, preco = $3, qtde_estoque = $4, descricao = $5 WHERE cod_produto = $1`, [cod_produto, nome_produto, preco, qtde_estoque, descricao])
  
    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Produto não encontrado.' })
    }
  
    res.json({ message: 'Produto alterado com sucesso!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(('/produtos'), async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT nome_produto, preco, qtde_estoque FROM produtos'
    )
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(('/produtos/:productId'), async (req, res) => {
  const { productId } = req.params
  try {
    const result = await pool.query(
      `SELECT nome_produto, preco, qtde_estoque FROM produtos WHERE cod_produto = ${productId}`
    )
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.delete(('/produtos/:productId'), async (req, res) => {
  const { productId } = req.params
  
  try {
    const result = await pool.query(
      `DELETE FROM produtos WHERE cod_produto=${productId}`
    )
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Produto não encontrado.' })
    }

    res.json({ message: 'Produto excluído com sucesso!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log('Listening on port ', PORT)
})

