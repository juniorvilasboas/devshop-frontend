import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import * as Yup from 'yup'
import { fetcher, useMutation } from '../../lib/graphql'

import Button from '../../components/Button'
import Input from '../../components/Input'
import Title from '../../components/Seo/title'

const CREATE_CATEGORY = `
    mutation createCategory($name: String!, $slug: String!) {
      createCategory (input: {
        name: $name,
        slug: $slug
      }) {
        id
        name
        slug
      }
    }
  `

const CategoryShema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Por favor, informe pelo menos um nome com 3 caracteres')
    .required('Por favor, informe um nome'),
  slug: Yup.string()
    .min(3, 'Por favor, informe pelo menos um slug com 3 caracteres')
    .required('Por favor, informe um slug')
    .test(
      'is-unique',
      'Por favor, utilize outro slug. Este ja está em uso.',
      async value => {
        const ret = await fetcher(
          JSON.stringify({
            query: `
              query{
                getCategoryBySlug(slug: "${value}"){
                  id
                }
              }
            `
          })
        )
        if (ret.errors) {
          return true
        }
        return false
      }
    )
})

const createCategories = () => {
  const router = useRouter()
  const [data, createCategory] = useMutation(CREATE_CATEGORY)
  const form = useFormik({
    initialValues: {
      name: '',
      slug: ''
    },
    validationSchema: CategoryShema,
    onSubmit: async values => {
      const data = await createCategory(values)
      if (data && !data.errors) {
        router.push('/categories')
      }
    }
  })

  return (
    <div>
      <Title>Criar nova categoria</Title>
      <div className='mt-8'></div>
      <div>
        <Button.LinkOutline href='/categories'>Cancelar</Button.LinkOutline>
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
                  label='Nome da categoria'
                  placeholder='Preencha com o nome da categoria'
                  value={form.values.name}
                  onChange={form.handleChange}
                  name='name'
                  errorMessage={form.errors.name}
                />

                <Input
                  label='Slug da categoria'
                  placeholder='Preencha com o slug da categoria'
                  value={form.values.slug}
                  onChange={form.handleChange}
                  name='slug'
                  helpText='Slug é utilizado para URLs amigáveis.'
                  errorMessage={form.errors.slug}
                />
              </div>
              <Button>Criar categoria</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default createCategories
