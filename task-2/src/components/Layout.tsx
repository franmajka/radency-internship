// For tailwind content
const ratioToClass = {
  '3/4': 'w-3/4',
  '1/3': 'w-1/3'
}

export const Layout = ({ ratio, children } : {
  ratio?: keyof typeof ratioToClass,
  children: React.ReactNode | React.ReactNode[]
}) => (
  <div
    className={`
      mx-auto
      my-0
      ${ ratio ? ratioToClass[ratio] : 'w-3/4'}
    `}
  >
    {children}
  </div>
)
