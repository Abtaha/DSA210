import {
  TrendingDown,
  BrainCircuit,
  Database,
  CheckCircle2,
  Info,
  ArrowDownCircle,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const genreData = [
  { genre: "Action", disparity: -0.135 },
  { genre: "Adventure", disparity: -1.273 },
  { genre: "Comedy", disparity: -1.075 },
  { genre: "Crime", disparity: -0.97 },
  { genre: "Drama", disparity: -0.9 },
  { genre: "Family", disparity: -1.666 },
  { genre: "Romance", disparity: -1.109 },
];

const ratingComparisonData = [{ name: "Avg Rating", book: 7.55, movie: 6.64 }];

const featureImportanceData = [
  { feature: "Book Rating", importance: 0.461 },
  { feature: "Budget", importance: 0.343 },
  { feature: "Action Genre", importance: 0.064 },
  { feature: "Comedy Genre", importance: 0.031 },
  { feature: "Drama Genre", importance: 0.03 },
];

const matchedSamples = [
  {
    title: "The Great Gatsby",
    book: 3.92,
    movie: 7.3,
    normalized: 7.84,
    diff: -0.54,
  },
  { title: "Spectre", book: 3.78, movie: 6.3, normalized: 7.56, diff: -1.26 },
  {
    title: "Alice in Wonderland",
    book: 4.02,
    movie: 6.4,
    normalized: 8.04,
    diff: -1.64,
  },
  {
    title: "A Christmas Carol",
    book: 4.05,
    movie: 6.6,
    normalized: 8.1,
    diff: -1.5,
  },
  {
    title: "The Jungle Book",
    book: 3.93,
    movie: 6.7,
    normalized: 7.86,
    diff: -1.16,
  },
  { title: "I, Robot", book: 4.2, movie: 6.7, normalized: 8.4, diff: -1.7 },
  {
    title: "The Da Vinci Code",
    book: 3.85,
    movie: 6.5,
    normalized: 7.7,
    diff: -1.2,
  },
  { title: "Contact", book: 4.0, movie: 7.2, normalized: 8.0, diff: -0.8 },
];

const chartConfig = {
  book: {
    label: "Book Rating",
    color: "#a78bfa", // Violet 400
  },
  movie: {
    label: "Movie Rating",
    color: "#7c3aed", // Violet 600
  },
} satisfies ChartConfig;

const importanceConfig = {
  importance: {
    label: "Importance",
    color: "#8b5cf6", // Violet 500
  },
} satisfies ChartConfig;

export default function App() {
  return (
    <div className="dark flex flex-col min-h-screen bg-[#09090b] text-zinc-100 selection:bg-primary/30">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] px-6 flex flex-col items-center justify-center text-center space-y-10 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

        <Badge
          variant="outline"
          className="px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary border-primary/20 bg-primary/5 rounded-full animate-in fade-in slide-in-from-bottom-3"
        >
          2025-2026 Spring Term • DSA 210
        </Badge>

        <div className="space-y-4 max-w-5xl">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-4 duration-700">
            THE <span className="text-primary italic">BOOK</span> WAS <br />
            <span className="text-zinc-500">ACTUALLY</span> BETTER.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-medium max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-1000">
            A quantitative analysis of 124 literary adaptations revealing the
            mathematical truth behind the screen.
          </p>
        </div>

        <div className="flex items-center gap-4 animate-in fade-in duration-1000 delay-500">
          <div className="h-px w-12 bg-zinc-800"></div>
          <ArrowDownCircle className="h-6 w-6 text-zinc-600 animate-bounce" />
          <div className="h-px w-12 bg-zinc-800"></div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border-b border-white/5">
        {[
          {
            label: "Matched Pairs",
            value: "124",
            icon: Database,
            color: "text-blue-500",
          },
          {
            label: "Avg. Disparity",
            value: "-0.91",
            icon: TrendingDown,
            color: "text-red-500",
          },
          {
            label: "Significance",
            value: "p < 0.05",
            icon: CheckCircle2,
            color: "text-emerald-500",
          },
          {
            label: "Top Predictor",
            value: "46% Weight",
            icon: BrainCircuit,
            color: "text-purple-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[#09090b] p-8 flex flex-col items-center justify-center text-center space-y-2"
          >
            <stat.icon className={`h-5 w-5 ${stat.color} opacity-80`} />
            <div className="text-3xl font-bold tracking-tight">
              {stat.value}
            </div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <main className="max-w-6xl mx-auto w-full p-8 md:p-12 space-y-32">
        {/* Section: Overview */}
        <section id="overview" className="space-y-12">
          <div className="max-w-3xl mx-auto space-y-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              The Core Debate
            </h2>
            <p className="text-zinc-400 text-lg">
              Does the quality of source material dictate cinematic success? We
              applied data science methodologies to quantify the transition from
              page to screen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-zinc-900/50 border-white/5 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-zinc-100">
                  Rating Distribution
                </CardTitle>
                <CardDescription className="text-zinc-500">
                  Average scores on a standardized 10-point scale
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <BarChart
                    data={ratingComparisonData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid vertical={false} stroke="#27272a" />
                    <XAxis dataKey="name" hide />
                    <YAxis domain={[0, 10]} stroke="#71717a" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="book"
                      fill="var(--color-book)"
                      radius={[4, 4, 0, 0]}
                      name="Book (Normalized)"
                    />
                    <Bar
                      dataKey="movie"
                      fill="var(--color-movie)"
                      radius={[4, 4, 0, 0]}
                      name="Movie (TMDB)"
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="space-y-6 flex flex-col justify-center">
              <div className="space-y-2">
                <Badge className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/10 border-blue-500/20">
                  Hypothesis
                </Badge>
                <p className="text-zinc-300 leading-relaxed">
                  We hypothesized that the quality loss during adaptation is
                  measurable and potentially correlated with production
                  characteristics or narrative genres.
                </p>
              </div>
              <Separator className="bg-white/5" />
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/30 border border-white/5">
                  <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">
                    Book Avg
                  </p>
                  <p className="text-2xl font-bold text-zinc-100">8.02</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/30 border border-white/5">
                  <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">
                    Movie Avg
                  </p>
                  <p className="text-2xl font-bold text-zinc-100">7.11</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Pipeline */}
        <section id="pipeline" className="space-y-12">
          <div className="max-w-3xl mx-auto space-y-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Data Pipeline
            </h2>
            <p className="text-zinc-400 text-lg">
              Merging TMDB 5000 metadata with Goodreads 10M records to create a
              unique enriched dataset for analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Filtering",
                desc: "Isolating 'based on novel' keywords from TMDB dataset.",
              },
              {
                title: "Matching",
                desc: "Standardized title normalization for accurate cross-database joins.",
              },
              {
                title: "Enrichment",
                desc: "Integrating literary ratings and author metadata.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-3 text-center"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm mx-auto">
                  0{i + 1}
                </div>
                <h3 className="font-bold text-zinc-100">{step.title}</h3>
                <p className="text-sm text-zinc-500">{step.desc}</p>
              </div>
            ))}
          </div>

          <Card className="bg-zinc-950 border-white/5">
            <CardHeader>
              <CardTitle className="text-zinc-100">Dataset Explorer</CardTitle>
              <CardDescription className="text-zinc-500">
                Preview of the final 124 matched adaptation records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80 rounded-lg border border-white/5">
                <Table>
                  <TableHeader className="bg-zinc-900/50">
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="text-zinc-400">Title</TableHead>
                      <TableHead className="text-right text-zinc-400">
                        Book (5★)
                      </TableHead>
                      <TableHead className="text-right text-zinc-400">
                        Movie (TMDB)
                      </TableHead>
                      <TableHead className="text-right text-zinc-400">
                        Disparity
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matchedSamples.map((sample) => (
                      <TableRow
                        key={sample.title}
                        className="border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <TableCell className="font-medium text-zinc-200">
                          {sample.title}
                        </TableCell>
                        <TableCell className="text-right text-zinc-400">
                          {sample.book.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right text-zinc-400">
                          {sample.movie.toFixed(1)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="outline"
                            className="text-red-400 border-red-400/20 bg-red-400/5"
                          >
                            {sample.diff.toFixed(2)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>

        {/* Section: Analysis */}
        <section id="analysis" className="space-y-12">
          <div className="max-w-3xl mx-auto space-y-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              EDA & Testing
            </h2>
            <p className="text-zinc-400 text-lg">
              Validating cultural tropes through rigorous statistical testing
              and variance analysis. We moved beyond observation to prove that
              the disparity is mathematically significant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-zinc-900/50 border-white/5">
              <CardHeader>
                <CardTitle className="text-zinc-100">The Genre Gap</CardTitle>
                <CardDescription className="text-zinc-500">
                  Average disparity across primary genres
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <BarChart
                    data={genreData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid horizontal={false} stroke="#27272a" />
                    <XAxis
                      type="number"
                      domain={[-1.5, 0]}
                      stroke="#71717a"
                      fontSize={12}
                    />
                    <YAxis
                      dataKey="genre"
                      type="category"
                      stroke="#71717a"
                      fontSize={12}
                      width={80}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="disparity"
                      fill="#8b5cf6"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-zinc-100">
                      Paired T-Test (Source vs. Adaptation)
                    </span>
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                      99.9% Confidence
                    </Badge>
                  </div>
                  <Progress value={99} className="h-1.5 bg-zinc-800" />
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    We employed a <strong>Paired T-Test</strong> because each
                    movie is directly linked to a specific book. This test
                    evaluates if the mean difference between these related pairs
                    is zero (Null Hypothesis). With a p-value of 2.36e-08, we
                    confirm the disparity is not a random fluctuation.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-zinc-100">
                      One-Way ANOVA (Genre Impact)
                    </span>
                    <Badge
                      variant="outline"
                      className="text-zinc-500 border-white/10"
                    >
                      Insignificant
                    </Badge>
                  </div>
                  <Progress value={51} className="h-1.5 bg-zinc-800" />
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    <strong>ANOVA</strong> was used to determine if the "quality
                    loss" varies by genre. The F-statistic of 0.87 (p=0.51)
                    indicates that no single genre is significantly better or
                    worse at surviving the adaptation process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: ML */}
        <section id="ml" className="space-y-12">
          <div className="max-w-3xl mx-auto space-y-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Predictive Modeling
            </h2>
            <p className="text-zinc-400 text-lg">
              Forecasting cinematic reception using Random Forest Regressors and
              weighted features. We trained our model to predict TMDB scores
              based on literary and production metadata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <Card className="bg-zinc-900/50 border-white/5">
              <CardHeader>
                <CardTitle className="text-zinc-100">
                  Feature Importance Map
                </CardTitle>
                <CardDescription className="text-zinc-500">
                  Relative weight of predictors in the final model
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ChartContainer
                  config={importanceConfig}
                  className="h-full w-full"
                >
                  <BarChart
                    data={featureImportanceData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid horizontal={false} stroke="#27272a" />
                    <XAxis type="number" hide />
                    <YAxis
                      dataKey="feature"
                      type="category"
                      stroke="#71717a"
                      fontSize={12}
                      width={120}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="importance"
                      fill="var(--color-importance)"
                      radius={[0, 4, 4, 0]}
                    >
                      {featureImportanceData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? "#8b5cf6" : "#4c1d95"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="bg-zinc-900/20 py-4 border-t border-white/5">
                <p className="text-sm text-zinc-400 italic">
                  *Categorical features (Genres) were One-Hot Encoded and
                  numerical features were Standard Scaled.
                </p>
              </CardFooter>
            </Card>

            <div className="space-y-8">
              <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 space-y-6">
                <h3 className="text-xl font-bold">Random Forest Regressor</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  We selected a <strong>Random Forest</strong> architecture
                  because it effectively handles non-linear relationships
                  between budgets and ratings. By aggregating 100 decision
                  trees, the model reduces variance and prevents overfitting on
                  our 124-sample dataset.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-sm font-medium text-zinc-300">
                      Mean Squared Error (RMSE)
                    </span>
                    <span className="font-mono font-bold text-primary">
                      0.62
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-sm font-medium text-zinc-300">
                      R-Squared (Variance Explained)
                    </span>
                    <span className="font-mono font-bold text-primary">
                      0.28
                    </span>
                  </div>
                </div>
                <p className="text-xs text-zinc-500">
                  Our model explains 28% of the variance in movie ratings, with
                  the original book quality being nearly twice as influential as
                  the production budget.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Conclusion */}
      <section className="py-24 px-8 md:px-12 border-y border-white/5 flex flex-col items-center text-center space-y-8 bg-zinc-950/50">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
            THE VERDICT
          </h2>
          <p className="text-xl md:text-3xl text-zinc-400 italic leading-tight">
            "The data confirms the trope: Source materials maintain higher
            standards of user appreciation. The highest ROI for producers isn't
            in the budget, it's in the book they choose."
          </p>
        </div>
      </section>

      <footer className="py-20 px-8 bg-zinc-950 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-xl font-bold tracking-tight">Book vs. Movie</h3>
            <p className="text-sm text-zinc-500 max-w-xs mx-auto md:mx-0">
              A final project for DSA 210 Introduction to Data Science, Spring
              Term 2026.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-4 text-left">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">
                Technologies
              </p>
              <ul className="text-xs text-zinc-400 space-y-1">
                <li>Python / Pandas</li>
                <li>Scikit-Learn</li>
                <li>React / Vite</li>
                <li>Tailwind / Shadcn</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">
                Project
              </p>
              <ul className="text-xs text-zinc-400 space-y-1">
                <li>
                  <a
                    href="https://github.com/abtaha/dsa210"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    GitHub Repo
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/abtaha/dsa210/blob/main/README.md"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Final Report
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    TMDB Dataset
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.kaggle.com/datasets/bahramjannesarr/goodreads-book-datasets-10m"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Goodreads Dataset
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
