<template>
    <div class="header">
        <RouterLink class="header-item-logo" to="/">
            <img alt="kood/ logo" class="logo" src="../assets/images/graphql-icon.svg" />
        </RouterLink>
        <div class="header-item-nav d-flex flex-row">
            <a class="col-4 linkedIn" href="https://www.linkedin.com/in/robertkrislaur/ " target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-linkedin" viewBox="0 0 16 16">
                    <path
                        d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
            </a>
            <div class="col-12">Made by nimi25820</div>
        </div>
    </div>
</template>

<style>
.header {
    z-index: 99;
    min-height: 60px;
    max-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    min-width: 290px;
    width: 100%;
    position: fixed;
    background: linear-gradient(to bottom, hsl(0, 0%, 5%) 0%, rgba(0, 0, 0, 0.35) 59%, transparent 100%);
    top: 0;
}

.header-item-logo {
    justify-content: flex-start;
    padding-left: 10px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}

.logo {
    width: 35px;
    height: 35px;
    margin-left: 35px;
}

.logo :hover {
    color: hsl(0deg 0% 80%);
    transform: scale(1.13);
    transition: 0.3s;
}

.header-item-nav {
    justify-content: flex-end;
    color: hsl(0deg 0% 80%);
    font-size: 16px
}

.linkedIn {
    font-size: 15px;
    color: #da0b95c7;
    margin-right: 10px;
    border-left: 1px solid hsl(0deg 0% 80%);
    padding-left: 30px;
    transition: 1.13s;
}

.linkedIn:hover {
    color: rgba(218, 11, 149, 0.78);
    transition: 1.13s;
}

.linkedIn svg {
    width: 20px;
    height: 20px;
    transform: scale(1.13);
    transition: 0.3s;

}

.linkedIn svg:hover {
    color: hsl(0deg 0% 80%);
    transform: scale(1.13);
    transition: 0.3s;
}
</style>