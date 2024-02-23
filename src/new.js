const addTodo = () => {
    if (todo.trim() !== '') {
      const isDuplicate = todos.some((item) => item.list.toLowerCase() === todo.toLowerCase());
  
      if (isDuplicate) {
        setErrorMessage('Duplicate todo. Please enter a unique value.');
      } else {
        if (editId) {
          const updatedTodos = todos.map((item) =>
            item.id === editId ? { ...item, list: todo } : item
          );
          setTodos(updatedTodos);
          setEditId(0);
          setTodo('');
          setErrorMessage('');
        } else {
          setTodos([{ list: todo, id: Date.now(), status: false }, ...todos]);
          setTodo('');
          setErrorMessage('');
        }
      }
    } else {
      setErrorMessage('Please enter a non-empty value');
    }
  };
  