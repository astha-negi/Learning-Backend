const WelcomeMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-6xl mb-4">🌿</div>
      <p className="text-gray-500 font-medium text-lg">Nothing on your list!</p>
      <p className="text-gray-400 text-sm mt-1">Add your first task above and get things done.</p>
    </div>
  );
};

export default WelcomeMessage;
