import GithubMark from "@/assets/github-mark.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AppHeader = () => {
  return (
    <header className="border-b shadow-sm p-4">
      <div className="container mx-auto flex justify-center items-center gap-3">
        <span className="text-2xl font-bold">Recipe Generator</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <img
                src={GithubMark}
                className="cursor-pointer scale-transition"
                alt="Github Mark"
                width={25}
                onClick={() => window.open('https://github.com/rulkimi/recipe-generator', '_blank')}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Github Repository</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  )
}

export default AppHeader;