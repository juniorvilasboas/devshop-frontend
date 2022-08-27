import React from 'react'
import { useMutation, useQuery } from '../../lib/graphql'

import Alert from '../../components/Alert'
import Button from '../../components/Button'
import Title from '../../components/Seo/title'
import Table from '../../components/Table'

const GET_ALL_CATEGORY = `
    query {
      getAllCategories {
        id
        name
        slug
      }
    }
  `

const DELETE_CATEGORY = `
  mutation deleteCategory($id: String!) {
    deleteCategory (id: $id) 
  }
`

const Index = () => {
  const { data, mutate } = useQuery(GET_ALL_CATEGORY)
  const [deleteData, deleteCategory] = useMutation(DELETE_CATEGORY)
  const remove = id => async () => {
    await deleteCategory({ id })
    mutate()
  }
  return (
    <div>
      <Title>Criar nova categoria</Title>
      <Button.Link href={'/categories/create'}>
        Criar nova categoria
      </Button.Link>
      {data && data.getAllCategories && data.getAllCategories.length === 0 && (
        <Alert message={'Nunhuma categoria criada.'} />
      )}
      {data && data.getAllCategories && data.getAllCategories.length > 0 && (
        <div className='mt-8'>
          <Table>
            <Table.Head>
              <Table.Th>Categoria</Table.Th>
              <Table.Th></Table.Th>
            </Table.Head>

            <Table.Body>
              {data &&
                data.getAllCategories &&
                data.getAllCategories.map(item => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <Table.DataName name={item.name} slug={item.slug} />
                    </Table.Td>
                    <Table.Td>
                      <Table.Link href={`/categories/${item.id}/edit`}>
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
