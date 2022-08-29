import React from 'react'
import { useMutation, useQuery } from '../../lib/graphql'

import Alert from '../../components/Alert'
import Button from '../../components/Button'
import Title from '../../components/Seo/title'
import Table from '../../components/Table'

const GET_ALL_PRODUCTS = `
    query {
      getAllProducts {
        id
        name
        description
        slug
      }
    }
  `

const DELETE_PRODUCT = `
  mutation deleteProduct($id: String!) {
    deleteProduct (id: $id) 
  }
`

const Index = () => {
  const { data, mutate } = useQuery(GET_ALL_PRODUCTS)
  const [deleteData, deleteProduct] = useMutation(DELETE_PRODUCT)
  const remove = id => async () => {
    await deleteProduct({ id })
    mutate()
  }
  return (
    <div>
      <Title>Gerenciar produtos</Title>
      <Button.Link href={'/products/create'}>Criar novo produto</Button.Link>
      {data && data.getAllProducts && data.getAllProducts.length === 0 && (
        <Alert message={'Nunhum produto criado.'} />
      )}
      {data && data.getAllProducts && data.getAllProducts.length > 0 && (
        <div className='mt-8'>
          <Table>
            <Table.Head>
              <Table.Th>Produtos</Table.Th>
              <Table.Th></Table.Th>
            </Table.Head>

            <Table.Body>
              {data &&
                data.getAllProducts &&
                data.getAllProducts.map(item => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <Table.DataName
                        name={item.name}
                        slug={item.description}
                      />
                    </Table.Td>
                    <Table.Td>
                      <Table.Link href={`/products/${item.id}/edit`}>
                        Edit
                      </Table.Link>{' '}
                      |{' '}
                      <Table.Link href='#' onClick={remove(item.id)}>
                        Remove
                      </Table.Link>
                    </Table.Td>
                  </Table.Tr>
                ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  )
}

export default Index
