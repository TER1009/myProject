using System;
using back.interfaces;
using back.models;
using System.Collections.Generic;
using back.db;
using System.Linq;
using back.DTO;

namespace back.repository
{
    public class reportPagesRepository
    {
        dbContextFWebsite db;
        public reportPagesRepository()
        {
            db = new dbContextFWebsite();
        }

        public void create(reportPagesDTO item)
        {
            db.reportPages.Add(returnEntity(item));
            db.SaveChanges();
        }

        public List<reportPagesDTO> getAll()
        {
            var list = db.reportPages.ToList();
            List<reportPagesDTO> result = new List<reportPagesDTO>();
            foreach (var item in list)
            {
                result.Add(new reportPagesDTO()
                {
                    id = item.id,
                    pageId = item.pageId,
                });
            }
            return result;
        }

        public reportPagesDTO getById(Guid id)
        {
            return getAll().First(_item => _item.id == id);
        }

        public reportPages returnEntity(reportPagesDTO item)
        {
            return new reportPages()
            {
                id = item.id,
                pageId = item.pageId,
            };
        }
        public reportPagesDTO returnDTO(reportPages item)
        {
            return new reportPagesDTO()
            {
                id = item.id,
                pageId = item.pageId,
            };
        }
    }
}