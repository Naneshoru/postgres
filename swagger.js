const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRUD API',
      version: '1.0.0',
      description: 'API de CRUD para produtos',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Produto: {
          type: 'object',
          required: ['nome_produto', 'preco', 'qtde_estoque'],
          properties: {
            cod_produto: {
              type: 'integer',
              description: 'Código do produto',
            },
            nome_produto: {
              type: 'string',
              description: 'Nome do produto',
            },
            preco: {
              type: 'number',
              description: 'Preço do produto',
            },
            qtde_estoque: {
              type: 'integer',
              description: 'Quantidade em estoque',
            },
            descricao: {
              type: 'string',
              description: 'Descrição do produto',
            },
          },
          example: {
            nome_produto: 'Sunga',
            preco: 23.99,
            qtde_estoque: 69,
            descricao: 'elástica para uso na praia'
          },
        },
      },
    },
    paths: {
      '/produtos': {
        post: {
          summary: 'Cria um novo produto',
          tags: ['Produtos'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Produto',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Produto criado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Produto',
                  },
                },
              },
            },
            500: {
              description: 'Erro no servidor',
            },
          },
        },
        get: {
          summary: 'Retorna a lista de todos os produtos',
          tags: ['Produtos'],
          responses: {
            200: {
              description: 'Lista de produtos',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Produto',
                    },
                  },
                },
              },
            },
            500: {
              description: 'Erro no servidor',
            },
          },
        },
      },
      '/produtos/{productId}': {
        put: {
          summary: 'Atualiza um produto existente',
          tags: ['Produtos'],
          parameters: [
            {
              in: 'path',
              name: 'productId',
              schema: {
                type: 'integer',
              },
              required: true,
              description: 'Código do produto',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Produto',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Produto alterado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Produto',
                  },
                },
              },
            },
            404: {
              description: 'Produto não encontrado',
            },
            500: {
              description: 'Erro no servidor',
            },
          },
        },
        get: {
          summary: 'Retorna um produto pelo ID',
          tags: ['Produtos'],
          parameters: [
            {
              in: 'path',
              name: 'productId',
              schema: {
                type: 'integer',
              },
              required: true,
              description: 'Código do produto',
            },
          ],
          responses: {
            200: {
              description: 'Produto encontrado',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Produto',
                  },
                },
              },
            },
            404: {
              description: 'Produto não encontrado',
            },
            500: {
              description: 'Erro no servidor',
            },
          },
        },
        delete: {
          summary: 'Deleta um produto pelo ID',
          tags: ['Produtos'],
          parameters: [
            {
              in: 'path',
              name: 'productId',
              schema: {
                type: 'integer',
              },
              required: true,
              description: 'Código do produto',
            },
          ],
          responses: {
            200: {
              description: 'Produto excluído com sucesso',
            },
            404: {
              description: 'Produto não encontrado',
            },
            500: {
              description: 'Erro no servidor',
            },
          },
        },
      },
    },
  },
  apis: ['./server.js'],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
};