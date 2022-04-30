using back.models;
using System.Collections.Generic;
using System;
using back.db;
using System.Linq;
using back.interfaces;


namespace back.repository
{
    public class userRepository : iBaseRepository<client>
    {

        private dbContextFWebsite dbContext;
        public userRepository()
        {
            dbContext = new dbContextFWebsite();
        }
        public void create(client client)
        {
            dbContext.Clients.Add(client);
            dbContext.SaveChanges();
        }
        public void update(client client)
        {
            dbContext.Clients.Update(client);
            dbContext.SaveChanges();
        }
        public List<client> getAll()
        {
            return dbContext.Clients.ToList();
        }

        public client getById(Guid id)
        {
            var result = new client();
            var list = dbContext.Clients.ToList();
            foreach (var user in list)
                if (user.id == id)
                {
                    result = user;
                    break;
                };
            return result;
        }

        public client getById(string tokenRefresh)
        {
            var result = new client();
            var list = dbContext.Clients.ToList();
            foreach (var user in list)
                if (user.tokenRefresh == tokenRefresh)
                {
                    result = user;
                    break;
                };
            return result;
        }
        public void delete(client client)
        {
            dbContext.Clients.Remove(client);
            dbContext.SaveChanges();

        }
    }
}