using back.models;
using System.Collections.Generic;
using System;
using back.db;
using System.Linq;
using back.interfaces;

namespace back.repository
{
    public class charactersRepository : iBaseRepository<contentpages>
    {
        private dbContextFWebsite dbContext;
        public charactersRepository()
        {
            dbContext = new dbContextFWebsite();
        }
        public void create(contentpages page)
        {
            dbContext.Contentpages.Add(page);
            dbContext.SaveChanges();
        }

        public void update(contentpages page)
        {
            dbContext.Contentpages.Update(page);
            dbContext.SaveChanges();
        }

        public List<contentpages> getAll()
        {
            return dbContext.Contentpages.ToList();
        }

        public contentpages getById(Guid id)
        {
            var list = getAll();
            foreach (var item in list)
            {
                if (item.id == id) return item;
            }
            return null;
        }

        public void delete(contentpages page){
            dbContext.Contentpages.Remove(page);
            dbContext.SaveChanges();
        }
    }
}