using back.models;
using System.Collections.Generic;
using System;
using back.db;
using System.Linq;
using back.interfaces;

namespace back.repository
{
    public class charactersRepository : iBaseRepository<characters>
    {
        private dbContextFWebsite dbContext;
        public charactersRepository()
        {
            dbContext = new dbContextFWebsite();
        }
        public void create(characters characters)
        {
            dbContext.Characters.Add(characters);
            dbContext.SaveChanges();
        }

        public void update(characters characters)
        {
            dbContext.Characters.Update(characters);
            dbContext.SaveChanges();
        }

        public List<characters> getAll()
        {
            return dbContext.Characters.ToList();
        }

        public characters getById(Guid id)
        {
            var list = getAll();
            foreach (var item in list)
            {
                if (item.id == id) return item;
            }
            return null;
        }

        public void delete(characters characters){
            dbContext.Characters.Remove(characters);
            dbContext.SaveChanges();
        }
    }
}