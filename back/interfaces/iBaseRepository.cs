using System;
using System.Collections.Generic;
using back.models;

namespace back.repository
{
    public interface iBaseRepository<T>
    {
        public void create(T client);
        public void updute(T client);
        public List<T> getaAll();
        public T getById(Guid id);
        public void delete(T client);
    }
}