import {
  BrowserRouter,
  NavLink,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'

import ChampioshipPage from './components/ChampioshipPage'

const FIRST_YEAR = 2003
const LAST_YEAR = 2015

const LINKS = Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 })
  .map((_, index) => {
    return index + FIRST_YEAR
  })
  .map(year => {
    const yearString = year.toString()

    return {
      id: yearString,
      description: yearString,
      path: `/${year}`,
    }
  })

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <div className="bg-gray-100 mx-auto p-4">
            <h1 className="text-center font-semibold text-xl">Desafio Final</h1>
          </div>
        </header>

        <main>
          <div className="container mx-auto p-4">
            <div className="flex flex-row items-start justify-between">
              <ul className="mr-4">
                {LINKS.map(({ id, description, path }) => {
                  return (
                    <li key={id} className="m-1">
                      <NavLink
                        to={path}
                        activeClassName="active-link"
                        className="p-1"
                      >
                        {description}
                      </NavLink>
                    </li>
                  )
                })}
              </ul>

              <div className="flex-1">
                <Switch>
                  {LINKS.map(({ id, path }) => {
                    return (
                      <Route key={id} path={path}>
                        <ChampioshipPage />
                      </Route>
                    )
                  })}

                  <Redirect to="/2003" />
                </Switch>
              </div>
            </div>
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}
