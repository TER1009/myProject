using System;
using System.Collections.Generic;
using back.models;

namespace back.interfaces
{
    public interface iBaseRepository<T>
    {
        public void create(T item);
        public void update(T item);
        public List<T> getAll();
        public T getById(Guid id);
        public void delete(T item);
    }
}