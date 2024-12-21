import { NavLink } from "react-router-dom";
import GithubMark from "@/assets/github-mark.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavMenu {
  label: string;
  url: string;
}

const navMenus: NavMenu[] = [
  { label: 'Generate', url: '/generate' },
  { label: 'Saved Recipes', url: '/saved-recipes' },
]

const AppHeader = () => {
  return (
    <header className="sticky top-0 border-b shadow-sm p-4">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <img src="/logo.svg" alt="App Logo" width={25}/>
          <span className="text-xl font-bold">Recipe Generator</span>
        </div>

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-4">
            {navMenus.map(menu => (
              <NavLink
                key={menu.url}
                to={menu.url}
                className={({ isActive }) => `hover:text-zinc-600 cursor-pointer ${ isActive ? 'font-semibold' : ''}`}
              >
                {menu.label}
              </NavLink>
            ))}
          </nav>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <img
                  src={GithubMark}
                  className="cursor-pointer scale-transition aspect-square w-[25px] h-[25px]"
                  alt="Github Mark"
                  onClick={() => window.open('https://github.com/rulkimi/recipe-generator', '_blank')}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Github Repository</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  )
}

export default AppHeader;