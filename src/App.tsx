import TaskBoard from "./components/TaskBoard";

export default function App() {
  return (
    <div className="App">
      <header className="text-center py-4 bg-blue-600 text-white">
        <h1 className="text-3xl font-bold">Kanban Task Board</h1>
      </header>
      <main className="p-6">
        <TaskBoard />
      </main>
    </div>
  );
}
