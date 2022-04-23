using System;
using back.interfaces;
using back.models;
using System.Collections.Generic;
using back.db;
using System.Linq;

namespace back.repository
{
    public class roomRepository : iBaseRepository<room>
    {
        dbContextFWebsite db;
        public roomRepository()
        {
            db = new dbContextFWebsite();
        }
        public void create(room item)
        {
            db.Rooms.Add(item);
            db.SaveChanges();
        }
        public void update(room item)
        {
            db.Rooms.Update(item);
            db.SaveChanges();
        }
        public List<room> getAll()
        {
            return db.Rooms.ToList();
        }
        public room getById(Guid id)
        {
            var list = getAll();
            foreach (var item in list)
            {
                if (string.Equals(item.id.ToString(), id.ToString())) return item;
            }
            return null;
        }
        public void delete(room item)
        {
            db.Rooms.Remove(item);
            db.SaveChanges();
        }
    }
}