using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeveloperTest.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DeveloperTest.Controllers
{
    [ApiController, Route("customers")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService customerService;

        public CustomerController(ICustomerService customerService)
        {
            this.customerService = customerService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(customerService.GetCustomers());
        }
    }
}
