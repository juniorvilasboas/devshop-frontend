import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { useMutation, useQuery } from '../../lib/graphql'

import Button from '../../components/Button'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Title from '../../components/Seo/title'

const GET_ALL_CATEGORY = `
    query {
      getAllCategories {
        id
        name
        slug
      }
    }
  `

const CREATE_PRODUCT = `
    mutation createProduct($name: String!, $description: String!, $slug: String!, $category: String!) {
      createProduct(input: {
        name: $name,
        slug: $slug,
        description: $description,
        category: $category
      }){
        id
        name
        description
        slug
      }
    }
  `

const Index = () => {
  const router = useRouter()
  const [data, createProduct] = useMutation(CREATE_PRODUCT)
  const { data: categories, mutate } = useQuery(GET_ALL_CATEGORY)
  const form = useFormik({
    initialValues: {
      name: '',
      description: '',
      slug: '',
      category: ''
    },
    onSubmit: async values => {
      const data = await createProduct(values)
      if (data && !data.errors) {
        router.push('/products')
      }
    }
  })

  let options = []
  if (categories && categories.getAllCategories) {
    options = categories.getAllCategories.map(item => {
      return {
        id: item.id,
        label: item.name
      }
    })
  }

  return (
    <div>
      <Title>Criar novo produto</Title>
      <div className='mt-8'></div>
      <div>
        <Button.LinkOutline href='/products'>Voltar</Button.LinkOutline>
      </div>
      <div className='flex flex-col mt-8'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          <div className='align-middle inline-block min-w-full bg-white shadow overflow-hidden sm:rounded-lg border-b border-gray-200 p-12'>
            {data && !!data.errors && (
              <p className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative'>
                Ocorreu um erro ao salvar os dados.
              </p>
            )}
            <form onSubmit={form.handleSubmit}>
              <div className='flex flex-wrap -mx-3 mb-6'>
                <Input
                  label='Nome do produto'
                  placeholder='Preencha com o nome do produto'
                  value={form.values.name}
                  onChange={form.handleChange}
                  name='name'
                  errorMessage={form.errors.name}
                />

                <Input
                  label='Descrição do produto'
                  placeholder='Preencha com a descrição do produto'
                  value={form.values.description}
                  onChange={form.handleChange}
                  name='description'
                  helpText='Description é utilizado para mais informações do produto.'
                  errorMessage={form.errors.description}
                />

                <Input
                  label='Slug do produto'
                  placeholder='Preencha com o slug do produto'
                  value={form.values.slug}
                  onChange={form.handleChange}
                  name='slug'
                  helpText='Slug é utilizado para URLs amigáveis.'
                  errorMessage={form.errors.slug}
                />

                <Select
                  label='Categoria do produto'
                  placeholder='Escolha a categoria do produto'
                  value={form.values.category}
                  onChange={form.handleChange}
                  name='category'
                  helpText=''
                  errorMessage={form.errors.category}
                  options={options}
                />
              </div>
              <Button>Criar Produto</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
