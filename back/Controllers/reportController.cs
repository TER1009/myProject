using System.Net.Http.Headers;
using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using back.DTO;
using back.services;
using System.Text.Json;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Linq;

namespace Name.Controllers
{

    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class report : ControllerBase
    {
        reportPagesService reportPagesService = new reportPagesService();
        contentPagesDTOService contentPagesService = new contentPagesDTOService();
        [HttpPost(nameof(reportPost))]
        public async Task<IActionResult> reportPost([FromBody] reportPagesDTO page)
        {
            reportPagesService.create(page);
            return Ok();
        }

        [HttpGet(nameof(getReports))]
        public async Task<IActionResult> getReports()
        {
            var list = reportPagesService.getAll();
            var list2 = new List<contentPagesDTO>();
            foreach (var item in list)
            {
                list2.Add(contentPagesService.getById(item.pageId));
            }
            return Ok(list2);
        }
    }
}