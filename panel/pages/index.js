import React from 'react'
import { MdHome } from 'react-icons/md'
import Card from '../components/Card'
import Seo from '../components/Seo'
import Title from '../components/Seo/title'
import Table from '../components/Table'

const Index = () => {
  return (
    <>
      <Seo title='Devshop' description='Devshop' />
      <Title>Devshop Painel de Controle</Title>
      <div className='mt-4'>
        <div className='flex flex-wrap -mx-6'>
          <Card>
            <Card.Icon>
              <MdHome className='h-8 w-8 text-white' />
            </Card.Icon>
            <Card.Data>
              <Card.Title>2000</Card.Title>
              <Card.Description>Produtos</Card.Description>
            </Card.Data>
          </Card>

          <Card>
            <Card.Icon>
              <MdHome className='h-8 w-8 text-white' />
            </Card.Icon>
            <Card.Data>
              <Card.Title>2000</Card.Title>
              <Card.Description>Produtos</Card.Description>
            </Card.Data>
          </Card>

          <Card>
            <Card.Icon>
              <MdHome className='h-8 w-8 text-white' />
            </Card.Icon>
            <Card.Data>
              <Card.Title>2000</Card.Title>
              <Card.Description>Produtos</Card.Description>
            </Card.Data>
          </Card>
        </div>
      </div>
      <div className='mt-8'></div>
      <div className='flex flex-col mt-8'>
        <div className='-my-2 py-2 overflow-x-auto sm:px-6 lg:-mx-8 lg:px-8'>
          <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
            <Table>
              <Table.Head>
                <Table.Th>Name</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th></Table.Th>
              </Table.Head>

              <Table.Body>
                <Table.Tr>
                  <Table.Td>
                    <Table.DataName
                      name='John Doe'
                      email='john@exemple.com'
                      srcImage='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    />
                  </Table.Td>
                  <Table.Td>
                    <Table.DataTitle title='Software Engineer' name='Web dev' />
                  </Table.Td>
                  <Table.Td>
                    <span className='px-2 inline-flex text-xs leading-5 font-semibold bg-green-100 text-green-800 rounded-full'>
                      Active
                    </span>
                  </Table.Td>
                  <Table.Td>Owner</Table.Td>
                  <Table.Td>
                    <Table.Link href='#'>Edit</Table.Link>
                  </Table.Td>
                </Table.Tr>
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
