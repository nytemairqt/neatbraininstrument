/*
    Copyright 2021, 2022, 2023 David Healey

    This file is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This file is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with This file. If not, see <http://www.gnu.org/licenses/>.
*/

namespace Paths
{
    reg pathData;
    const icons = {};    
      
    // X - Material (1:1)
    pathData = "356.t0F..ZBQVNypCwFtk8.QlfV1CE2xY3.Q+++1CIMFLPz++u8Pwk8EJPz++u8PruLBDYBZYOTb..3AD0DzVOD..d.Qa4rzCEG..d.QnwryCw9xHPDjzv7PrQi4ePz++24Prw9xHPj2V90PwA.fGPDKmo0P..3ADgzXRMTb..3ADI1WJMD6Ki.Qv9RQCEW1Wn.Q9++OCIMFLPj+++yPwsbFNPj+++yP3V1CDA6KEMDa..nIDgFyPNDaHoYODA6KEMTbzXtOD4+++LjKmCDQ9++OCE2InKDQ9++OCQAMDQDruTzPwA.fEQjXeozP..XQDgzXRMTb..XQDwxYZMDEzPDQda4WCw1xYzBQ++emCwFEzPDQPRCyCEG..VDQnwryCA.fEQzVNK8PwA.fEQTSPa8PTPCQDYBZYOTbmftPD8++aOjKmCDQ+++1CEGMl6CQ+++1Cgjl8PjInk8PrA.flPjkyr5PiUF";
  
    icons.x = Content.createPath();
    icons.x.loadFromData(pathData);
    
    // Check - Reza
    pathData = "200.t0ltY44Pb8xnDIlv024PdYwnDU4TcNjWVLJQ99NmCw0KiRDatIzkCgpljRDaOJLkCAq9iRjX35EkCIa3iRzh7N4PxF9nDMIVSNDr5OJQhsI8RNjqSPJQaRujCkCOjRzjXM4P2TEoDw1JGZ4PUCRoDI1NuZ4PYqRoDkX3VNDqvTJQAVwkCgpLkRjXGZ1kCgpMkRjr8d4PUCSoDsH+WNzKgTJQroaVdNz1INJQhIaudNT2vMJQx1qmCIFRiRjtY44Pb8xnDMVY...";
  
    icons.check = Content.createPath();
    icons.check.loadFromData(pathData);    
    
	// Add - Material (1:1)
	pathData = "356.t0lRRHBQsssoCw1ssu.QsssoCE23Kn.QsssoCIewHPjhOQ5PwA.fGPDpCG5P..3ADA..dNTb..3ADcEOZNj7Ei.QzA6kCE23Kn.QRRRkCca6KPjjjT4ProjDhPjjjT4ProjDhPj11F0PwojDhPjhunzP6f0HDQ7EEMTbr3IID4+++LD..ZBQ9++OCEG0ggBQ9++OCY7ooPDwWTzPwca6pPjhunzP21tJDossQMDa21tJDIIIUNDaJIQPDIIIUNTbdPuPDIIIUNzC5PDQzA6kCEG..VDQWwilCA.fEQD..34PwA.fEQDpCG5POnCQDo3SjNTbdPuPD011lNjRRDDQsssoCw1ssqBQsssoCw1ssqBQRRxzCE2ssqBQ5ft0CY7ooPTGzk8PwQcXnPD..v8P..nIDA..bOTbr3IIDA..bOzNXMBQcPW1CEmRRHBQ5ft0CojDhPjjjL8ProjDhPTaaa5PiUF";

	icons.add = Content.createPath();
	icons.add.loadFromData(pathData);
    
    // Edit - Material (1:1)
    pathData = "424.t0lii4.QjiiyCw1B1LAQjiiyCwFd2SCQhHthCwlK3ICQNNdgCw16N.CQQDQfCwlii4.QpOIwCwlii4.QjiiyCMVaGGuBDA..bOTbFrWBDA..bOzf8g.Q6Sf1CEG..d.Q0m.1CA.fGPjbbT8PrA.fGPzzmQ7PwA.fGPzYlF7PDQ.BD0wI+NTbHhHBDM8o7NjA6k.QXKrtCwFd2SCQVv9QCEG8oWCQhHBQC8IM2PjDQHzPwoze3PD...zP..dNDA...MTb1BzNDA...MzV.xCQRDgPCEG..2CQhHBQCgHx9PDQDgzProOgCQjNNt0PwMXiDQjKX80PBaPQDIrUjMTb..XQDYUUoMD..VDQtfsaCEG..VDQXK.cCIrAEQzfsj2PwMXiDQjKX42P5S3PDgROANDaT5AFDUeBXOTbWvxED8t6YOjbrWAQ3cu1CEWyrRAQ...2CcASSPD..v8Prcb7JPD..v8Pi0lbb5CQtfsaCwF8ImCQ533VCwlbb5CQtfsaCMVa3cOMDIh3JNDatfmLD433ENDau6.LDEQDANDa3cOMDIh3JNzXkA";
    
    icons.edit = Content.createPath();
    icons.edit.loadFromData(pathData);
    
	// Trash - Material (0.8:1)
	pathData = "504.t0F.fLAQ..73CEmls+.Q..73C0roMPjYx78PwA.XKPTyjp8P..1BDA.PTODa..1BDA..eMTbloaBDA..eMzLch.QzrnVCEG..d.QlYgUCA.fGPD..9zPwA.fGPjloizPyzIBD4LcDMTbloaBDA...MD.fs.Q...PCwF.fqAQ...PCEG.fqAQZlVNCMS+aPjyzSyPwYlFcPD..ByP..rGDA.fvLDa..jKDA.fvLTbZV9KDA.fvLTyBDCQNSOMCEG.fHCQZlVNCA.HxPD...zPrA.nAQD...zPwoYQCQD...zPLKFQD4LcDMTb..XQDoY5HMD..VDQ..3SCEG..VDQlYgUCwrXDQDMKp0PwoYQCQD..70P..ZPDA..eMDa..ZPDA.PTOTb..ZPD0LoZOzLY8CQlIy2CEmYRzCQ..73CA.34PD..O9PrA.HSPD..O9Pi0F.fmCQ..vWCwF.fLAQ..vWCwF.fLAQ..D0CwF.fmCQ..D0CwF.fmCQ..vWCMVa..tFDA.vDODa..pHDA.vDODa..pHDA..9MDa..tFDA..9MDa..tFDA.vDOzXsA.XpPD..S7PrA.HxPD..S7PrA.HxPD..32PrA.XpPD..32PrA.XpPD..S7Pi0F.fLAQ..vWCwF.fLAQ..D0CwF.fLAQ..vWCMVY";

	icons.trash = Content.createPath();
	icons.trash.loadFromData(pathData);
    
    // Heart - Material (33x29)
    pathData = "662.t0F..ZBQ4cR0CEG5UVBQ4cR0CI2njPj+9Q8PwsOriPzfVO8PKjuHDw8XRODaDcmGDsOFJOTblHUEDI8L4NzDo4.QLgWpCEG..d.QHyalCA.fGPDCDf3PwA.fGPDuuN2PYCDCDQFrfMTb2FPDD4PrMMzgHfAQNDaSCEmlIvAQNDaSCMb0ePDbTT0PwwdniPz42w0P..nIDUkDrMTb5.ZJDc9cbMTsD0BQvQQUCEGLoCCQNDaSCk28zPjCw1zPwoj+6PjCw1zPn7KPDQFrfMTb..XQDw6qyMD..VDQLP.hCEG..VDQHyalC4il9PT69k5PwsGs2PjDAk6PgHnKDIiIJODanMfJDImZROTbI1TJDUZ1SOzycgBQJBH0CEWEtcBQ4cR0CA.flPTdmT8Pi0VyrPBQ7zOfCEG5GHBQl04bC454dPjj7q1Pwk2waPzpaI1PGh.FDs5VhMTbDKwDDs5VhMDtd+.QbYzaCEGppx.QMDCeCgppLPTYOf3PwgppLPDHxB4PhF5CDA7RZNTbXhoDD4U4iNj+3ZAQ4uNqCEGXYqAQTJesCYOPePzx+16PwcHpiPj.MV7P..nIDoNwJOTb5cUJDk2oEOjB+1BQBzbuCEGnlHCQUJesCEWQ1PDqZy5PwYDY5PDwBO5PMyUOD4AJZNTbYUEPDAXiPNTVUADQLP.hCEWVUADQMDCeCwpF8PDWF81PwA.34PzpaI1P4cOMDs5VhMTbPsRLDs5VhMzsQ3BQQHtZCEGF3qBQKh1bCwKtnPDO8C3PwIERnPjFUI3PVa6IDI87BNTbTUxIDonjCNDwxYBQJJ4fCEWM.WBQJJ4fC0AJkPjzyK3PwA.jjPjFUI3PMyBIDwS+.NzXsA.flPDY424PiUF";
    
    icons.heart = Content.createPath();
    icons.heart.loadFromData(pathData);
    
    // Heart Filled - Material
    pathData = "205.t0FKcpBQVrrzCIlDJgBQpNv0C4dsjPjpCb8PSKlHDw1tRODawxfHDEsGROjXJ2eDDo.D0ND..d.QZlfnCsb4GPzRMo3PhYLEHPT+M+2PC3qBDMJ2qMTEN7.QN2AXCI1QgbAQ+egRCQeFgPT9dQ0PVvmIDIxjsMjX238JDkuWTMD4VWCQrheRCYg58Pjyc.1PhghNBQznbu1PkMNQD0ey+MDXRTDQK0jhCIF..VDQZlfnCIl95PjBPT6P5stJDQhORODarzoJDYwxROzXkA";
    
    icons.heartFilled = Content.createPath();
    icons.heartFilled.loadFromData(pathData);
        
    // Settings - Material (1:1)
    pathData = "950.t0lnQBBQqOT2CEm8g8AQqOT2CQzfdPTAut8PwIIocPzGZn8PUvWGDYrtWODakjHGDkSAIOTb1G3FDYrNHOTIYpAQY8wwCEGUvlAQqOfwCIZzXPD..S7PrQE7QPjnwo7PwYN0PPjjjs7P3k6CD4kqJOTbJ3oCDoB9IOTE72.QLm9wCwl8gf.QcJ3rCEG..d.Q9PWrCwKuGPj4T75PwgW9GPTi0x5PowNBDQRRqNDaGqsCDoSQhNTbHZrCDwbJgNDhF6.QbJBnCwFhF6.Qi08lCEGhF6.QzXslCcr1NPjw5l4PrkF6HPD21B4PwgW9GPzbJ83P7x6ADow5LNTb..3ADE7hJNj8gf.Qi0GhCwVE72.QnwBZCEmBd5.Qr9.YCgWtOPDQiJ1PwYN0PPz11D1PTAeDDwKGiMDahFMFDA.ftMTbTAaFDoB9qMDQipAQNEbZCEGMVtAQyo3YCURhbPTi0W1PrUAecPjbJhzPwIIocPjvKOzPDMnGDYen.MTb1G1GDoBd8LjnQBBQpfWOCwlWtwBQpfWOCEmBd1BQpfWOCwKetPj8gBzPw41VuPjvKOzPqO3KDImhHMDabaGLD0X8kMTbJ3WLDMmhmMD2lICQNEbZCEGqOMCQpf+ZC4kKzPD..51Prw5C6PDubL1PwowJ7Pz11D1PHZTODQznhMTb1GlODw5CjMz5C7CQnwBZCwlBdSDQi0GhCEG..VDQAunhCQzPEQjFqy3PwgnAEQzbJ83PXNAQDwssPNDa5ThODYrtYNTb3kiODQi0ZNDd43CQi08lCwFd43CQbJBnCEGd43CQLmRnCsOD9PjNEI5Prk0+CQDIIs5Pwkj7DQTi0x5PF7RQDYNEuNTbBuVQD4CcwNDyISDQcJ3rCwFqu6CQNE7wCE2sM4CQr9bxCoBJ8PzGZp7Pw0o.7Pjjjs7PubtNDIZbJODad4BMDA.vDOTbr9zLDs9.FODubICQY8wwCEGyoECQFqCxCwscvPTNEj7Prs9fuPjw5d8Pw41VuPzGZn8P7xmKDUvqaOTbJ3YKDs9PcOjWtwBQqOT2CwlnQBBQqOT2CMVa9gpIDIIIzNTbx5yJDIIIzNDu74BQ8gZqCEmw5FCQnwxoCYrtwPD..34PwYrtwPDlSS4P7xmKDI3UNNTbx5yJD411GNjenZBQts8gCEmB9GBQts8gC8gxdPjfW43PwQikaPDlSS4PzX4FDA..dNTbzX4FDgFKmNzGJ6AQ8gZqCEmB9GBQRRBsC4GplPjjjP6PiUF";
    
    icons.settings = Content.createPath();
    icons.settings.loadFromData(pathData);
    
	// Keyboard Arrow Up - Material (1:0.58)
	pathData = "218.t0F..ZBQKEBkCwFWPCAQSB3uCEm4H8.Q.9nvCk95LPDfOJ7PwwtiJPDfOJ7P1cPBDMIf+NTb..3ADYZb7ND..d.Qtd6sCEG..d.Qz1urCY2AIPDxt+5Pr03lhPDMMl2PwooQjPj.gK2P..nIDIP3xMTblkKJDIP3xMzbjoBQzzXdCwlh3ODQH69qCEG..VDQz1urCA.fEQjq2d6PwA.fEQjoww6PJh+PDMIf+NTbTDmPDA3iBOzET.DQ.9nvCEmF21CQ.9nvCQ5K7Pzj.96PrA.flPzRgP4PiUF";
	
	icons.keyboardArrowUp = Content.createPath();
	icons.keyboardArrowUp.loadFromData(pathData);
    
    // Keyboard Arrow Down - Material (1:0.58)
    pathData = "252.t0F..ZBQpulvCEWSiUBQpulvCAiZjPj94F7PwQQbiPjBHD7PMtoHD0OW+NDa1cPBD8LMLNTb..3ADMdIIND..d.QouFgCEG..d.QfO1eCY2AIPDBFk2PwwtiJPjKnL2PouNCD4BJyMTblizCD4BJyMDWPCAQHXTdCwF..ZBQLI.pCwFouvCQHXTdCEmF21CQtfxbCcAE.QjKnL2PwQQbBQjKnL2PJh+PDgfQ4MTb..XQDA9X+MD..VDQouFgCEG..VDQiWRhCoH9CQzyzv3PrMGYpPT+b86PwwtioPjBHD7PPWIJDoetAOTbyx4IDo9ZBOD..ZBQpulvCMVY";

    icons.keyboardArrowDown = Content.createPath();
    icons.keyboardArrowDown.loadFromData(pathData);

	// Caret left - Reza
	pathData = "293.t0FbNlcPPhEzAwFbNlcP9SoxAwVERxbPHLDvAI12OvbP5u8uAQjwKGTaM8aPDY7xAYvt9FjXDY7xAgYJ9Fz2OvbPJrYuAUgjLGz9yzaPrAmiYGjAhKaPrAmiYGDcdzZPhAmiYGTB9vZPYRN1AsKcqFzIfecPC7wpAI1saacPHkrpAYIrUGTe3qZP7kN0Ao1kqFDaV5quAQOM8FjXfwiuAI.m8FTwx2aPOphuAUr78Fz+65aPhUr78FDZN8aPfwiuAIO2+Fjk95aPAPDvAwFeoScPJFdzAI1htUcP6sjzAANHVGDYBJcPaTs0AQlfRGjX+5x0AQlfRGDUIdcPfSmzAYB3WGDAXIcPhYI4XGTRBHcPu4X1Ac.NQGzaNlcPShEzAMVY...";
	
	icons.caretLeft = Content.createPath();
	icons.caretLeft.loadFromData(pathData);

	// Caret right - Reza
	pathData = "293.t0Vwx2aPJu0cAwVwx2aPmR8ZAwFHuqbP5ByUAIlUwsbPdJlUAEutKGDgEUUPwq6xAYKHTEjXwq6xAsc+REjUwsbP8BdTAAx6JGDnRDUPrUr78FjstwSPrUr78FjjmCSPhUr78FDul7RPbxouAABksDjCg9aPvhNKAIlekBbP6zCKA8IzAGDoaxRP4dovA4W1sDDaeJL1AIIEQEjXUST1A4p3QEDbNlcPH+uTAAmiYGDphPUPhAmiYGzdGUUPUST1A8HYVEzmBicPrJyUAwVtWJbP91ldAIlpRHbPgFzdAUEXAGTbutWPZvJvAE2q6EjX1IEvAE2q6ET32+aPnQ4dA8Pn+FjrZsWPh8Im9FTOupWPFKeuAcqF4Ejwx2aPPu0cAMVY...";

	icons.caretRight = Content.createPath();
	icons.caretRight.loadFromData(pathData);

    // Arrow Left - Material (0.63:1)
    pathData = "175.t0lPV5BQeSu8CwVHKt.Qb5MrCEGjEl.Q5MMqCgrfHPD0af5PwA.fGPDKjM5P..3ADA..dNTb..3ADQ8lXNDxBh.QrP9jCEGjEl.QFxxiCExhKPDYgr3PrIjktPDQVnvPwcS+zPD3zCtPa5SODgrP8KTb..XQDgExLLD..VDQDxRLCwF..VDQ8l13CEG..VDQTuY8CsoO8PjSux+PwcS+zPDYgG.QBYoKD8M81OzXkA";

    icons.arrowLeft = Content.createPath();
    icons.arrowLeft.loadFromData(pathData);
    
    // Arrow Right - Material (0.63:1)
    pathData = "175.t0luo4AQeSu8CEWxBfAQjEd.DQVvOPjSux+PwA.fGPD0aV+P..3AD0aZiODa..3ADQHKwLTb..3ADgExLLDYA+.QHKT+BEWxBfAQfSO3B4aZdPDQVnvPr8McAQDYgr3PwAmdCQjgr73P3zGQDwB4SNTb..XQDQ8lXND..VDQ..fmCEG..VDQrP1nCgSeDQD0af5PwAmdCQjdSy5PeSWPDwo2vNDa9llGD8M81OzXkA";

    icons.arrowRight = Content.createPath();
    icons.arrowRight.loadFromData(pathData);
    
    // Power - Reza
    pathData = "379.t01SmuTPJnmRBIl2iwRPJnmRB0+0RDjz6BkP8esDAA7bXIjX8esDA45JfIjskwRP10lYB8z4KEjcsYlPhUqZqEjcsYlPGwmfA45JfIzQ7IXP.OGVBI1Q7IXPRuKTB0JaqEjB5ojPPc9RAofdJIzXssHoEETle5jPrsg6PETle5jPrsg6PEz3HVkPrsHoEEz3HVkPi01SmuTPadFXBIF31mSPadFXBwxaqDjlWykPr71JAA7bXIjXr71JA4xEUIjm4OSPtqiTBg8++DDvPDkPrg8++DjCEPkPhI1G5Dzf3SkPDliMAUJlVIDg4XSP.OGVBIFg4XSPkI1VBUn6+DzAC2kPOc9RAcvvcIjXZ.9UAcvvcIjFUFVPjI1VBoQkgEDvygkPhoQkgETf4YkPCyQWAMQwTIT1RZUPPr8TBwV1RZUPnjOTBIFy9LVPM7fTB4UXrEjU6SkPdEFaAgCcXIjXdEFaAIA1bIjmW2UPZdFXB4z4KEjlmAlPiUF...";

    icons.power = Content.createPath();
    icons.power.loadFromData(pathData);
    
    // Question - Reza
    pathData = "974.t0VJTWzPm.3FBIFCRVzPm.3FBUBVEMTk7tgPXZRQCkIMbHjXKTOQCwIqbHjUOSzPkQTGBwWsDMjI62gPhI5lDMDSx5gP45HQCwlYeHTtNRzP8gAHBIVtNRzPh6FHBEukDMDX+BhPxbJQCITBgHjX5cKQCY0TgHzfKSzPhgWHBIz3DMjX3EhPhk2BEMjX3EhPGaRQC4lCgHTI0TzPaoCHBIlaDUzPa+1GBEwUEMTJV6gPazVQCseadHjXkLXQC0bAdHzhkVzPfGcGBkB0EMD3Q2gPhA+9EMD3Q2gPxwgQCIVAdHTp0XzPjwlGBIF3NYzPXNsGB00VFMDNR8gPcskQCUE5eHjXcskQCkUMfHTXWYzPwwGHB8vSFMjG9BhPhgsQFMDy+ChPCxiQC04NgHDfvXzP5CWHBIFYjXzPHZZHBENDFMzH1GhPCWeQCowWhHjXUacQC0w0hHTS9VzPg6yHBMAqEMDPVNhPhkclEMDasOhPmrXQComTjHDJ.VzP9WLIBI1G0UzPPkSIBA7aEMD0AWhP.+VQCE4WlHjX.+VQCIW2lHTO2UzPBvyIB4igEMzt6chPh4SkEMDc6dhPDeZQCI31mHjy8VzPBt8IBIFNnWzPBt8IBYW.FMTI5chP4kfQCEtslHjXo3fQCQvVlHDlQXzPIogIB09DFMDu0WhPhoiEFMDLQWhPDlgQCEOqkHzscXzPxfXIBI18gXzPxMVIBIHJFMj+5ThPpDiQCQvCkHjXQmiQCkv3jHjYEYzPi.KIBI8TFMjE1QhPho9gFMDemNhPJvpQCgGEiHzJ.azPK0qHBIFQTazPdXlHB4Z4FMDJ9GhPKQuQCQhggHjXoKvQCEhCgHzGJbzP7JHHB8gBGMzBi+gPhshBGMjHY7gPp0uQCMUWdHTviazPJBaGBIVMJazPxOPGBUaoFMja6wgP.amQCcuEbHjX8djQCEqraHjkQXzPm.3FBkB0EMzI.tgPi0VrxVzP5CVJBIFPXVzP7LVJB8bfEMzbHlhP88VQCgRzoHjXExUQCkFGpHzBSUzPsimJBsvTEMT9lqhPhsvTEMT4hshPFyUQCgwvqHjZvUzPke.KBIFCDVzPyxDKB0vlEMTEuwhPVUaQCUwarHjXB6bQCUwarHDIkWzPqwDKBoH9EMz0FvhPhU9BFMDDAuhPkVgQCsIXqHToUXzPwYtJBIVoUXzPlgmJBAFCFMTZbnhPcmeQCgRzoHjXAcdQCsjgoHzTPWzP5CVJBQSsEMj9fkhPhgEsEMj9fkhPKNaQCcNXoHTrxVzP5CVJBMVY...";
    
    icons.question = Content.createPath();
    icons.question.loadFromData(pathData);
    
    // Question circle - Reza
    pathData = "1194.t0F.xixP..kEBIlvHbxP++jEBAndkLDBKxgP.pWICA.LjHjX.pWICkO0qHjvHbxPA3fLBAf7nLD.NHiPh4y1pLz+MHiP.nFKCgO0qHD.pwxP..CIBIF.pwxPIrHGB4y1pLT.PYgP.HOJCA.TVHzXsAf7nLD.1igPhs6epLT.1igP.B7JCcQ9cHDf.uxP..CIBIFf.uxPoalJBs6epLz+m8hP.HOJCA.ZuHjXFQ1ICE.ZuHD.jXxPpalJBA.IlLD.vPhPhE.IlLjE42gPFQ1IC8e8XHD.xixP.XOFBMVaHmOJCc6saHjXqdKJCc6saHj48gxPmP+FBkESnLTJrwgPhwrFnLDKjygP0S+ICU+dcHzFaexP2JiGBIVPAexPcmtGBoGsmLT+c9gP5Q6IC0.TfHjX5Q6ICImofHTj7dxPvaOHBIMymLjz.EhPhoQ2mLT4JFhPiD+ICI+qgHj3HfxPx+ZHBIlFwfxPx+ZHBkHSnLj+EEhPmqEJCsdbfHjXunFJCw1oeHDr7gxP41vGBoqjnLzhk5gPhULpnLTW83gPprLJCAWBdHDx4ixPvkfGBI1igjxPvkfGBEgPoLj773gPHsUJCQ+ndHjX+QWJCgxBeHjGAlxPOo3GB4QfoLDaf.hPh4QfoLDbsAhP+yWJCgHsfHTqzkxP0XOHBIVcrkxPieSHBUjXoLTKyEhP+XUJCkHpgHjXinTJCcg2gHze1jxPy1hHBA1FoLTpVJhPhEG+nLDqNLhPpONJCAmciHDrQixPO27HBIlc+hxP6SBIBUNrnLDBJRhPlWJJC0X+jHjXcqIJC8MbkHDWUhxPikeIBwUknLDHWZhPhwUknLT.UbhPbyIJCE4bmHT2qhxPJM6IBIV25hxPCL+IBMVynLDDSfhPsMNJCAwDnHjXW2PJCAwDnHjEmjxPyF6IBkwKoLzatahPhg7LoLjjRZhP1bSJC4kTlHzh4jxPQ2hIBIV16jxPEkfIBAxOoLzejWhPRMTJCA7ukHjXRdTJCAvlkHDHNkxPMJWIBcrUoLjjFUhPh41WoLzkZThP.rVJCA64jHDb4kxPj1JIBI1gslxPJ78HBcZzoLjALMhPIWdJCgM8hHjXhmeJCwZmhHDSKnxP0ViHBkdFpLTr8FhPhcHJpLjqEEhP+9hJCkjtfHzuunxPWpAHBI1xunxPtB0GBwvHpLz2T5gPhkfJCYA5cHjXV+dJC82NcHTUKmxP5KKGBAFmoLzfNwgPh4UaoLjOpugP1bSJCM6saHTx4ixPyd6FBMVaPgMJCoHloHjXe2KJCsrloHjamhxPD.bJBwQknLTtHnhPhQhfnLj9SohPphGJC4GrpHjp3gxPI5wJBIlp3gxP0o4JBQlfnLDp5uhPHXIJCY2OrHjXqlJJCMDgrHzp.ixPlZJKBUu1nLjolxhPhEF8nLjolxhPCqPJCw+frHTJdjxPm4CKBIFgwjxPgh+JBQzNoLzJXthPDsSJCIfGqHjXDsSJCc+qpHD.xjxP5OkJBw2GoLjtHnhPhANCoLT28lhPxWOJCsHloHzzZixPKhYJBIlCZixPKhYJBoT1nLDdXlhPDgMJCsHloHzXkA..";
    
    icons.questionCircle = Content.createPath();
    icons.questionCircle.loadFromData(pathData);
    
    // Info - Reza
    pathData = "353.t0F..PfP...CBwF...fP...CBwF...fP...zAIF...fPBrxwA4O03GD...bP...7AA...GDa...3AA...GjXBrx0AA...GD...cPBrxwAA..PGD...cPhA..PGj+TicPBrx0AA..fGD...dP...3AwF...dP...CBwF..fcP...CBIl.q7bP...CBA..HGTfU9fP...xAA..THjX...xA8mZXHj.q7bP...GBA..XGD..vgPrA..DHD..vgPh8mZHHD..vgP...CB8mZXHD..vfP...EBIF..vfPAV4CB8mZHHD..vfP...ABA..LHzXsA..rGD...aPhoDC2GD...aP....BoDCmFD...fP...mAIF...fP1NOjAoDC2GD..fXP...6AA..HFjX1NO3AA..HFD..fcP1NOjAA..XGD..vYPhA..XGjRLbZP1NO3AA..vFD..vdP...rAMVY...";
    
    icons.info = Content.createPath();
    icons.info.loadFromData(pathData);

    // Info circle - Reza
	pathData = "573.t0VG93yPXsmJBw11L3yPXsmJBw11L3yP123HBI11L3yPsQqHBcK38LD3CHhPUoZOCA9.hHDaOeTOCA9.hHjXsEQOCA9.hHTRkyyPsQqHBkT47Lj8MNhPhkT47LzemQhPrEQOCw.FkHzyG0yPLfQIBw1yG0yPXsmJBwFiVzyPXsmJBIlJfyyPXsmJBc.s7LT4qrhPGPKOC4VArHjXGPKOCcu2rHjJfyyPD9XKBwnE8LDgO1hPr0gO9LDgO1hPh8Gc9LDgO1hPiBpOCcu2rHznf5yPtU.KBI1nf5yPkuxJBAHc9LDV6ohPc3iOCg0dpHzXsQaj8Lzx4AhPhsa08Lzx4AhPayfOC4TmeHz1L3yPvznGBI11L3yPRzWGBsa08LTkfxgPzFYOCUInbHjXr1TOCUInbHTiVzyPSzWGB0nE8LDLM5gPh0nE8LjSc9gPs1TOCsbdfHDsQ1yPKmGHBMVaBpZOCAfNWHjXCE7NCAfNWHjfxnyPHLWGBInL5LD.XThPhInL5LD97xhPCE7NCAf8xHjfp1yP.XuLBIFvS9yP.XuLBIfHAMD97xhPBHRPCA.FkHjXBHRPCgvbcHDvS9yP.nyEBInp8LD.5bgPi0lfp1yP.3cFBIFO37yP.3cFBIHd.MzEg6gPBhGPCA.FkHjXBhGPCktSqHTO37yP.HELBInp8LD.RAiPhcLG7LD.RAiPAvsNCktSqHT.bqyP.fQIBIV.bqyPWDtGBcLG7LD.dmgPBpZOCAf2YHzXkA..";
     
	icons.infoCircle = Content.createPath();
	icons.infoCircle.loadFromData(pathData);
    
    // Warning - Reza
    pathData = "242.t0F..fdP...EBIl.q7cP...EBA..XGTfUdgP...1AA..bHjX...1A8mZfHj.q7cP...IBA..nGD..PhPh4O0vGD..PhP...9A8mZfHD..feP...GBIF..fePAV4EB4O0vGD..PgP...5AA..THzXsULHnGjpweYPhc7ReGjpweYPECB1AwJGeFTwffcPpF+oAwVwffcPUi+.BIVwffcPZQFBBc7ReGT03ufPECB5AUM9KHjXCWO7Asc9KHTwffePTMFBBULH3GT03OfPrULH3GjpweZPhULH3GDqb7YPCWO7AoZ7WFTwffdPpF+kAMVY...";

	icons.warning = Content.createPath();
	icons.warning.loadFromData(pathData);
	
	// Warning circle - Reza
	pathData = "462.t0VzMMyPgNdJBI1bWLyPgNdJBM05xLDHTphPSstLCcYaqHjXSstLC4vQrHzbWLyPMdOKBEcSyLTi2yhPh8BgyLTi2yhPNA6LC4vQrHjSvNyPW11JBIlSvNyPfPoJB8BgyLTnimhPQ2zLCE53oHzXsYoSyLTmHvgPhgCFyLTmHvgPXvtLCwQtbHDFrKyPSJYGBwFFrKyPU4rIBIFFrKyP+e5IBgCFyLzRXghPV5zLCsDVnHjXyS3LC0GVnHzDwNyPMe5IBMQryLTUNahPrMQryLzjR1gPhMQryLDG4xgPyS3LC0IBbHjkNMyPch.GBMVaS3zLCAfnVHjXTSVLCAfnVHzjV+xPHrMGBMo0uLD..RhPhMo0uLD9jvhPUSVLCAfWxHzDNMyP.3kLBIVT2TyP.3kLBMgw1LD9jvhPSXrMCA.fjHjXSXrMCgv1bHTT2TyP.HpEBMgSyLD.hZgPi01DNMyP.XTFBIVyaSyP.XTFBMIG1LzEI4gPSxgMCA.fjHjXSxgMCktspHTyaSyP.n6KBMgSyLD.59hPhgEvwLD.59hPS.HLCktspHzD.ByP..HIBI1D.ByPWjjGBgEvwLD.FkgPS3zLCAfQYHzXkA..";
	
	icons.warningCircle = Content.createPath();
	icons.warningCircle.loadFromData(pathData);	
	
	// Warning triangle - Reza
	pathData = "1513.t01+4dnPmFckBIlbncnPmFckBMjIGJj0SXoPCYxgBMVYVJjXCYxgBAusVJjbncnPejukB8etGJzG4aoPhw3BHJzG4aoP61DhBAusVJztMgnPiUlkBI1tMgnPVOgkBw3BHJzoQWoP+m6gBcZzUJzXswxtGJjgeBoPh8YZGJjgeBoPvcxgBUa3PJDbmbnPBMSjBwFbmbnPqlJkBIFbmbnPKsOkB8YZGJzY8ToPrr6gBcVOUJjX4x.hBoWOUJD5NgnP3rOkBgtSHJzpoRoPrgtSHJjPyDoPhgtSHJTsgCoP4x.hBY3mPJDK6dnPF9IjBMVaop6gBobnKJDaop6gBobnKJDaxH6gBIfnKJDaAm5gBUpnKJDaZE5gBU6nKJDaDj4gB8RoKJDaCC4gBQwoKJDadh3gBIVpKJDaXB3gBcAqKJDa3h2gBIyqKJDaBD2gBAqrKJDa6k1gBEosKJDanH1gBAstKJDaMr0gBw1uKJDavP0gBEFwKJDaU1zgBwZxKJDa+bzgBszyKJDazDzgBgS0KJDa1sygBE21KJDaIXygBEe3KJDaxCygBUK5KJDaxvxgBg66KJDaafxgBAm8KJDaafxgBAm8KJDaskAfBUpKXJDaskAfBUpKXJDagUAfBUgMXJDa1FAfBYaOXJDat4.fBQXQXJDaKt.fBoWSXJDaOj.fBIYUXJDa5a.fBcbWXJDaPU.fBQgYXJDaPP.fBMmaXJDa7L.fBEtcXJDaTK.fBU0eXJDaXK.fB07gXJDaIM.fBEDjXJDakP.fB4JlXJDasU.fBwPnXJDafb.fBgUpXJDa7j.fBsXrXJDaAu.fBAZtXJDar5.fBMYvXJDa7GAfB0UxXJDatVAfBsOzXJDaAmAfBcF1XJDax3AfB042XJDa8KBfBco4XJDaffBfBIU6XJDaX1BfBk77XJDafMCfBge9XJDa1kCfBs8+XJDaU+CfB8VAYJDa5YDfB8pBYJDae0DfBg4CYJDaAREfBgBEYJDaauEfBoEFYJDaoMFfB4BGYJDakrFfB84GYJDaKLGfB0pHYJDaUrGfBQUIYJDa9LHfBQ4IYJDaBtHfBsVJYJDaaOIfBcsJYJDaCwIfBg8JYJDa0RJfB0FKYJDacxJfBcIKYJDacxJfBcIKYJDa0hriBcIKYJDa0hriBcIKYJDarDsiB8EKYJDaclsiBo6JYJDaDHtiBopJYJDaZotiB8RJYJDaZJuiBkzIYJDa+puiBsOIYJDaEKviBUjHYJDakpviBkxGYJDaaIwiBo5FYJDagmwiBk7EYJDazDxiBk3DYJDaNgxiBwtCYJDap7xiBYeBYJDaEWyiBoJAYJDaZvyiBwv+XJDakHziB4Q9XJDaieziBQt7XJDaN0ziBMF6XJDakI0iB8Y4XJDajb0iBwo2XJDaHt0iB800XJDaM90iBs9yXJDaxL1iBcDxXJDazY1iBYGvXJDaPk1iB4GtXJDaFu1iBQFrXJDaT21iB0BpXJDa381iB88mXJDavB2iB42kXJDa9E2iBEwiXJDaeG2iBsogXJDaTG2iBQheXJDacE2iBAacXJDa4A2iBQTaXJDap71iBcNYXJDaw01iB0IWXJDaNs1iBsFUXJDaCi1iBgESXJDaQW1iBgFQXJDa6I1iBAJOXJDaB60iBUPMXJDaCs0iBUpKXJDaCs0iBUpKXJDa2zDhBAm8KJDa2zDhBAm8KJDaMiDhBcy6KJDaGPDhBkC5KJDap6ChBoW3KJDa2kChB4u1KJDazNChBoL0KJDai1BhBMtyKJDaHcBhBoTxKJDanBBhBU.wKJDaFmAhBYwuKJDanJAhBAntKJDaQs.hBgjsKJDaGO.hB4lrKJDaMv+gBYuqKJDapP+gBM9pKJDahv9gBUSpKJDa5O9gB4toKJDa3t8gBEQoKJDagM8gB44nKJDa4q7gBYonKJDaHJ7gBoenKJDaop6gBobnKJDaop6gBobnKJzXskptGJjqc1nPrk4nMJz+YeoProazAJz+YeoPiUF...";
	
	icons.warningTriangle = Content.createPath();
	icons.warningTriangle.loadFromData(pathData);	
		
  	// Error circle - Reza
  	pathData = "506.t0F.V5wP.fhEBIVvrxwP.fhEBAnGaLDBiwgP.5wFCA.BjHjX.5wFCgOqqHjvrxwP.XdLBAfkdLD.lGiPh4yefLD.lGiP.1fHCgOqqHDfMHxP.f.IBIFfMHxPHLFGB4yefLD.nXgP.XoGCA.JVHzXsAfkdLD.NigPho6HfLD.NigP.RVHCcQzcHDfjExP.f.IBIFfjExPo6iJBo6HfLD..8hP.XoGCA.PuHjXEgPGCA.PuHDfGuwPo6iJBA3waLD.HPhPhA3waLzEQ2gPEgPGCAfyXHD.V5wP.3LFBMVav+.HCo6GdHjX8m9GC49gcHDar9wPteXGBomgeLjte3gPrAfkdLjzgGhProWocLjte3gPhc3ecLj6G1gPCHTGC49gcHDAbzwP59gGBIVD1ywPFdqGBEg8bLDxs9gPDvQGCIVQfHDaJxfGCo2AjHDaDvQGCAVxmHjXQXOGCwRXnHTD1ywPtcUJBQ.GcLjNumhPhcePcLjAGphP68WGCYvgpHjdk1wP57dJBwF.V5wPhzhIBwldF9wP57dJBIFar9wPFbnJB0e5eLjAGphPv+.HCoy6oHjXWWCHC41UoHz00.xPrDFJBQ9CfLjjIehPro1GeLjdGPhPrQ9CfLzjEAhPhQdMfLzws9gPjWCHCU3sdHD7O.xP49gGBMVY...";
  
	icons.errorCircle = Content.createPath();
	icons.errorCircle.loadFromData(pathData);

	// Search - Material (1:1)
	pathData = "414.t0FJt4AQfh6tCEWMQSAQfh6tCoIJNPDam45PwA.fGPzMVD5P..3ADAE2MNTb..3ADQMQ0Mjln3.QpIpVCEWMQSAQ...PCghadPD...zPwswBnPD...zP1NqKDolnZMTbPwUMDQMQ0MDTbUCQPwciCEGTbUCQi7YkCoCHzPzK.x4PwQB4xPzNgM5PHYLLDI9pnNDaldHQD0oKPOTb..XQDE0GROD..VDQz6Q0CEG..VDQW5A1CY5gDQDSOn8PwwziCQD..v8P58fPDA..bOTbn9HPDA..bOjSW9CQL8f1CwV7UuBQPxnrCEWmvjBQIgrsCcAvkPTc.k6PwE4ShPDn3t6Pn3lGDAJt6NzXsghadPTNb15Pwg2BkPTNb15PJyZJDUYVjNTbb3jKDIuEaNDGN4BQPwciCEGGN4BQvFJfCoLqoPzE951Pwg2BkPDz3v0Pn3lGDAMNbMTbXC8EDAMNbMjguLAQW3qaCEGMN5.QvFJfCQiiNPDTb23PwQiiNPj7Vr4PF9xDDUYVjNTbXC8EDkCmsNDJt4AQ4vYqCMVY";

	icons.search = Content.createPath();
	icons.search.loadFromData(pathData);

	// Folder - Material (1:0.8)
	pathData = "202.t01Ly1.QYl4yCE2djr.QYl4yC4iTIPjG0u7PwA.fGPDoPg7P..3ADMyLCODa..3ADkYlwMTb..3ADcqWmMjORk.QBWAXCE2djr.QLyLVCMyrMPDyLi0Pr0LSfPDyLi0PrA.flPTlYF2Pr0LS+PTlYF2PwY31AQTlYF2PC25PD4n33MTb..XQDIbE.ND..VDQyLSgCwF..VDQyLyvCEG..VDQjBExCMbqCQjG0u7PwY31AQTlY97PMyzODkYlOODayLaCDkYlOOzXkA";
    
    icons.folder = Content.createPath();
    icons.folder.loadFromData(pathData);

    // Widgets - Material (1:1)
    pathData = "866.t0lpIHCQTgsnCwl0SPBQsxtgCE2rUNBQnAegCURXiPzEJS3PwYIKiPjwiN3PVxxHDo1TBNTbVxxHD4v.ANTIgMBQ5k6eCE2rUNBQYyVeCY8DjPzSzs2ProZBxPD.cNzPww7gxPDcjFzPzqwLDwiz.MTbc35LDI...MzRVQCQB..PCEWd9SCQB..PCIZj0PDORCzPwoLI1PDcjFzPrKpMDAPmCMDa.iIQD8Dc6MTbiaQQDkMa8MTbKUDQ5k6eCEG..VDQNLPfCA.fEQjZSI3PwA.fEQjwiN3PwsTQDcgxDNTbiaQQDgF7ENDvXRDQsxtgCwF6hZCQTgsnCEmxjXCQZR8nCIZj0Pjs8P5Pwkm+zPD0lR5PKYEMDQsojNTbc35LDQsojND8ZLCQ11CoCEGyGJCQZR8nCoZBxPDUXK5Pi0F..d.Qvv6jCwF..d.QBKJVCEG..d.Q5zvTCIbbHPjLF8zPwQ3XIPDJ+szPlirBDgxeKMDaN4mGDgxeKMTbvN9GDgxeKMjbUCBQxXzSCEGMGGBQ5zvTCQywgPjvhh0PrQywgPDL7N4PwQywgPD8FZ4PxUMHDgmZXNTbvN9GD4eSZNjS94AQ92jlCwl4Hq.Q92jlCEGgik.Q92jlCIbbHPDdpg4PwA.fGPD8FZ4P..3ADACuSNzXsEPVnPDMtU8PrEPVnPDYC35PwEPVnPDn3r5PDqTJDwQUoNTbFxiJDgYbmND5gtBQXF2oCwFTW8CQXF2oCEmr7BDQXF2oCQmqAQDGUk5PwYCnBQDn3r5P1.pPDQ1.tNDa1.pPDQiaUOTb1.pPDgONXODctFDQ7wg1CEmr7BDQA..2CA0U+PT..v8PrgdnqPT..v8PwYHOpPT..v8PDqTJDwGGZOTbAjEJDgONXOT.YgBQz3V0CMVa..3ADQiaUODa..3ADQ1.tNTb..3ADAJNqNjvwg.QbTUpCEGgik.QXF2oCYNxJPDlwc5Pr4jedPDlwc5PwA63ePDlwc5PxUMHDwQUoNTbzbbHDAJNqNDMGGBQjMfqCwFMGGBQz3V0CEGMGGBQ3iC1CIW0fPDebn8PwA63ePT..v8PN4mGDE..bODalirBDE..bOTbDNVBDE..bOjvwg.Q7wg1CEG..d.Q3iC1CA.fGPDMtU8PiUF";
	
	icons.widgets = Content.createPath();
	icons.widgets.loadFromData(pathData);
    
    // Save - Material (1:1)
    pathData = "555.t0lii4.Q...2CE2ELt.Q...2CsfgIPj5ye8PwA.fGPzzmO8P..3ADQNNNODa..3ADoiiaMTb..3ADwELPMzBFl.QtfARCE2ELt.Q...PC43XNPD...zPrwV3zPD...zPwIhP1PD...zPGG3MDIQDBMTbrELNDIhHDMT5ylCQVv9QCwl9DNDQaAyaCEGd2QDQPoubCw69DQD43e2PwA.fEQDd2y2P..XQDgROANDa..XQDQNNNOTb..XQDM84SOD84MDQpO+0CEW5yEDQ...2CIGm9PD..v8Pr43XNPD..v8Pi0F..ZBQVU0wCEWNNqBQVU0wCcbzsPTNNE7PwUU0vPTGGs6PUUMLDsppxNTbUUMLDkiCpNzwQ2BQbb.oCEWNNqBQ..fmCA.flPD..34PwcbLhPD..34P43xGDwwAjNTbppBGDkiCpNjppvAQqpprCEmppvAQcbztCkiKePTNNE7PwcbLhPjUUc7P..nIDYUUGOzXswwQUPD43.4Pr43XsPD43.4PwAk1tPD43.4PRe8KD4cONNTbUUMLDgsPLNTUUCCQVUUhCwVUUCCQxwwcCEWUUCCQrETbCI80uPTXK01PwAk1tPjUUk1PNNVKDYUUoMDabbTEDYUUoMTbaA8DDYUUoMD1RKAQgsTaCEWUUGAQrETbCUU0QPjbbb2PrUU0QPjUUk3PwUU0QPD1Bw3PXKsDD4cONNTbaA8DDQNNPNDGGUAQjiCjCMVY";
    
    icons.save = Content.createPath();
    icons.save.loadFromData(pathData);
    
    // Reset - Material Icons 16x16
    pathData = "373.t0lrnxCQNFJZCIl0FZCQYnATC4f0sPTzzGzPDeDIDIm2EMjXpjmEDg8aKMTkbr.QTfDdCUajIPjOAe4PhA.fGPjX+v6PltYEDgYAaOTImcBQXVv1CIVcmMCQXVv1C4ks8Pzjyy7PkbnPDAgs3NjXVs6PDA3pyNDCsGDQPAdqCkEI+PDTf25PhA.v8PDTf25Pp6FOD4XXuNDzTuCQzzcrCIlfTdCQnWBwCwmXsPjQ797Pv9iHDkOwJOjXWVdFDEREGOTnoLAQtZWtCgOYQPDeBi5PhY+NNPzwPt3PfTUFDQSWiMTImcBQzz0XCI14k1BQzz0XC0zMyPjX+11PzczMDYnI9MDapjYLDg8aJNjXnoyKDwUKONDKhCCQr1zkCY0NzPDqMc4PrQNuAQDqMc4PhooyCQDqMc4P..XQDAt5SND..VDQ0c7iCwF..VDQzhXZCIF..VDQJPBWCg8aAQjbdU0PVDwODoW1dMDayhJOD4XnnMzXkA";
    
    icons.reset = Content.createPath();
    icons.reset.loadFromData(pathData);
	
	// Open - Material Icons
    pathData = "268.t0lbb5CQjiiyCwlii4.QjiiyCwlii4.Q433VCwF..ZBQ433VCwF..ZBQ...PCwlii4.Q...PCIVxPp.Q...PCA.fGPzYlwzP..3ADkiiaMDa..3ADQNNNOjX..3AD4LyUOTxPp.Q...2C43XNPD..v8PrIGm9PD..v8PhclYBQD..v8P..XQD4LyUOD..VDQjiiyCwF..VDQ..fmCwlbb5CQ..fmCwlbb5CQjiiyCMVaNNVKDA...MDaNNVKDkiiaMDajDbNDkiiaMDaDU9ED0sewNDaRBLGDoWM6NDaxwoODM29tMDaxwoODQNNPNDa..XQDQNNPNDa..XQDA...MDaNNVKDA...MzXkA";

    icons.open = Content.createPath();
    icons.open.loadFromData(pathData);

	// Reverse - Material Icons 18x14
	pathData = "148.t01R9TAQxwwkCwF..d.QqpprCw1R9TAQjiiyCw1R9TAQ43XtCwlii0BQ43XtCwlii0BQbb7pCw1R9TAQbb7pCw1R9TAQxwwkCMVa..XQDYUUINDa0F7MDkiiaMDa0F7MDcbbBNDaxw4GDcbbBNDaxw4GDQNNPNDa0F7MDQNNPNDa0F7MD433jNDa..XQDYUUINzXkA";

	icons.reverse = Content.createPath();
	icons.reverse.loadFromData(pathData);
	
	// Repeat - Material Icons 18x20
	pathData = "184.t0VGGUAQxwwcCwF43dCQxwwcCwF43dCQjiCjCwF..VDQUUUZCwF43dCQiiiLCwF43dCQ333VCwlii4.Q333VCwlii4.QxwwkCwVGGUAQxwwkCwVGGUAQxwwcCMVaji6MDcbb.ODacbTEDcbb.ODacbTEDwwwqNDa..3ADYUUGODacbTED833hODacbTEDQNNNODaxwoODQNNNODaxwoOD433jNDaji6MD433jNDaji6MDcbb.OzXkA";
	
	icons.repeat = Content.createPath();
	icons.repeat.loadFromData(pathData);
	
	// Hive - Material Icons
	pathData = "387.t0FraCBQfscOCwF5srAQvL6XCwFraCBQ.VLgCwF9kvBQ.VLgCwFLRGCQvL6XCwF9kvBQfscOCMVa.XRCDA6IpMDaP.3ADg6+GNDa.XRCDA55ZNDaffGFDA55ZNDaXQhGDg6+GNDaffGFDA6IpMzXsgXhzPDrmn1PrA71tPDt+e3PrgXhzPDnqq4Prg51+PDnqq4PrA.fEQDt+e3Prg51+PDrmn1Pi0FpaCBQXPwhCwF1srAQ..fmCwFpaCBQnuNrCwF5kvBQnuNrCwFHRGCQ..fmCwF5kvBQXPwhCMVavWRCDgiNgNDa..3ADAhIzNDavWRCDgfDGODaXfGFDgfDGODaHQhGDAhIzNDaXfGFDgiNgNzXsAXhzPDN5D5PrA61tPDHlP6PrAXhzPDBRb7PrA51+PDBRb7Prg+eEQDHlP6PrA51+PDN5D5Pi0FlaCBQ.pysCwFzsrAQnYhxCwFlaCBQPIQ2CwF3kvBQPIQ2CwFFRGCQnYhxCwF3kvBQ.pysCMVY";
	
	icons.hive = Content.createPath();
	icons.hive.loadFromData(pathData);
	
	// Clock - Material Icons 19x20
	pathData = "277.t0FD3YBQA..PCIFYaUAQA..PCA.fGPDTMd2P..3ADA..dNjX..3ADgUN.ODYaUAQ...2CAAdlPD..v8PhwJm2PD..v8P..XQDgUN.OD..VDQ..fmCIF..VDQP03cCwJm2PT...zPPfmIDE...MzXsA.flPjlY97PhoDyXPjlY97PyLaCD01Y4NzLy1.Q..fmCI1Ly1.QThofCoDyXPjyLi0P..nID4LyXMjX1NCMD4LyXMTyL8CQThofC0LS+PD..34Ph0LS+PTamk6P1NCMDoYlOOD..ZBQZl4yCMVaMy.JDA..9MDalY1HDA..9MDalY1HDQyLjNDaMy5LDItt2NDa..fMDApFvNDaMy.JD0LieNzXkA";
	
	icons.clock = Content.createPath();
	icons.clock.loadFromData(pathData);

	// Update clock - Material Icons 24x24
	pathData = "321.t0F..VDQGgOjCwVN+7BQGgOjCwlc8fCQ5pNeCIFnG8BQ1fWVCsbwfPjGnf0P0+7EDIpl6MjXensCDE1kONzGZ6.QDbDqCU+yWPDEQ36PhsbwfPDIa+7PfdzKDQx1OOjc8fCQTDguCIVKzxCQ.UTsCk369PD61q5PI9tODo48cNDa..XQDo48cNjX..XQDwt8pNTlbJDQ3V8tCob07PjtAc7PhIITwPDvY38P9roGDAbFdOjAVLAQ5FzwCIVMYd.QCpGrCA.fGPDrzs3P3TvDDAuVoMjXvonGDEHy6Lz7DDCQAx7NCohh7PD7Zk1PrA.fEQDt1QzPrA.fEQzQ3C4Pi0lAZlBQv1vfCwlAZlBQrNumCwl0VTCQJrIqCwl24JCQmwHsCwFqsRBQD.9nCwFqsRBQv1vfCwlAZlBQv1vfCMVY";
	
	icons.updateClock = Content.createPath();
	icons.updateClock.loadFromData(pathData);

	// Hourglass bottom - Material Icons 12x20
	pathData = "157.t0F..VDQppp.DwlwxUDQUU0wCwVUUCCQ..fmCwlwxUDQsARZCwF..VDQppp1BwF..d.Qppp1BwF..d.QUUUZCwlppvAQ..fmCwF..d.QgqywCwF..d.Qppp.DwF..VDQppp.DMVaUUcDDA..eMDaUUcDDoppVLDappxNDoppVLDappxNDA..eMDa..nIDUU0XNDaUUcDDA..eMzXkA";
	
	icons.hourglassBottom = Content.createPath();
	icons.hourglassBottom.loadFromData(pathData);

	// Press - Material Icons 15x21
	pathData = "487.t0VDQjAQ8D0hCwVDQjAQNyLVCIVDQjAQnuePC0hrcPTd28xPlY1HDk2cuLjXfpQJDk2cuLzt61BQnuePCs6tsPjyLi0Prs6tsPTOQs3PhMAuxPDDeR3P..fMD03kxMD..XCQNyLVCIF..XCQLG5KCYRrsPDZl4vPlY1HDglYNLjXltQFDglYNLTyLCAQLG5KC0LyPPjyLi0Ph0LyPPziWJ2P5BAEDAwmDNTDQjAQ8D0hCMVaXzaPD43kwNDarjuKDoL5dNjXJUjKDYJUdNzzF1BQ..fmCgburPD..34PrkYloPD..34PrkYloPjyLi0PhkYloPjySrzPlRsIDE...MjYlMBQA..PCIlI3+AQA..PCMyLcPjySrzPyLSGD4LyXMDayLSGDowKEOjXqGkCD4q49NDZQ5.QnuuuCo8ANPD5666PhQ8uLPD5666PMd4BDQvC.OT6Cq.QFYavCwF..d.QHMExCwlKquAQjlR7CIF3HzAQHT17CculdPDyLS+PLyDHDwLyzODaF1EODwLyzOjXfb2ODwLyzOD1bGDQZCD7CwSTBQj92n9PrYsZEQDPm56PhsVcEQDGS36P..XQDoue8ND..VDQ9+OuCIF..VDQp+8sCgd6CQjHoM6PXzaPD43kwNzXkA";
	
	icons.press = Content.createPath();
	icons.press.loadFromData(pathData);

	// Trademark
	pathData = "2581.t0F.fs.Q..fmCwF.fs.Q..fmCwlqns.QcXKnCwVrBt.Q9o1nCwV9st.QnsgoCw1Zpu.QhbLpCwF32v.Q1u1pCwVIVx.QyffqCwF.Ez.QtnIrCwFJD1.QBAxrCwVSS3.QRiYsCw1Dx5.QII.tCwFEf8.QarktCwV3b.AQHGJuCwV.nCAQaSsuCw17.GAQrKOvCwlJmJAQfpuvCwVEZNAQppNwCw1EYRAQNGrwCwliiVAQd6GxCwly3ZAQ7BhxCwFJXeAQdY5xCwl3.jAQJ6PyCwlOxnAQZjkyCwldqsAQ5Q3yCwVyqxAQq.IzCwlZx2AQBtWzCwVf97AQnWjzCw1NOBBQZ6tzCw1viGBQtW2zCwlO6LBQMq8zCwFzTRBQ1zA0CwVmuWBQ.zC0CwlwJcBQTnC0CwlakhBQ1QA0CwVs9mBQ8v7zCwFvUsBQXF1zCwFsoxBQJSszCwls42BQvXhzCw16D8BQ1XUzCwFiJBCQhUFzCwFuIGCQPQ0yCwlrALCQtNhyCwVpwPCQ9PMyCwF2XUCQXa1xCw1i1YCQiwcxCw1BJdCQeWCxCwFnRhCQXQmwCwVoOlCQtiIwCw1c.pCQRSpvCwlejsCQDkIvCwVI6vCQRdmuCwV4CzCQZDDuCwVO91CQFcetCwlso4CQMt4sCwV3E7CQw8RsCwFWR9CQ.RqrCw1xN.DQNwBrCwF35ADQ8gYqCwlUVCDQvpupCwV7fDDQVREpCwlfZEDQdeZoCwF4BFDQAYunCwl+YFDQ3EDnCwF.fFDQ..fmCwF.fFDQ..fmCwF.fFDQ..fmCwlTWFDQjmzlCw1S8EDQDVIlCw1AREDQaRdkCwVkUDDQhiyjCwVHHCDQOPIjCwF2oADQReeiCwV.6+CQWW1hCwV168CQD+MhCwVsr6CQzblgCwF7M4CQ91+fCw16e1CQtSZfCwlHiyCQAxqeCwl.XvCQaYkdCwVD+rCQ4ngcCwl1XoCQPqfbCw16kkCQ5phaCwV6lgCQxwmZCwlcbcCQRIvYCwlMGYCQT56XCwV2mTCQOMKXCw1H+OCQ1IdWCwlwMKCQT2zVCwlhTFCQSbOVCw1MTACQu9sUCwllM7BQBjPUCwFgA2BQ1P2TCwVxvwBQPIhTCwVPbrBQlPQTCwlwDmBQnoDTCwFMqgBQTV7SCw1YPbBQAX3SCwlO0VBQXu3SCwlkZQBQTb8SCwlSALBQDdFTCw1PpFBQNySTCwFTVABQnYkTCwlSF7AQdN6TCwFE61AQPNUUCwFd0wAQ1TyUCw1Q1rAQZcUVCwFT9mAQdh6VCwlVNiAQ9ckWCwlImdAQKISXCw1bIZAQybDYCw180UAQ7P4YCwlXsQAQJcwZCwVWvMAQb3raCwlh+IAQTYqbCwFgaFAQw0rcCwF2DCAQUCwdCwFG7+.QE22eCwFwA8.Q1hffCw1RV5.QvQFgCwFH52.QKBsgCwVos0.Q8sThCwlMwy.QtN8hCwFHEx.Q.dliCw1pov.QLUPjCw1Ceu.Qms5jCwlekt.QdfkkCwFG8s.Q6lPlCwV.ls.QD56lCwF.fs.Q..fmCwF.fs.Q..fmCMVa..XQDA..dNDa..XQDA..dNDaUXWQDUTFgNDaZgUQD4HLjNDaiaRQDI9PmNDaOGNQDcTTpNDaJkHQDsrUsNDaM1AQD4mTvNDac64PDgmPyNDaJ1vPDgMI1NDaymlPDQ783NDa+QaPDAWt6NDai1NPDYAZ9NDadWAPDAf.AODa41xODMXgCODaJWiODQP7EODav5RODcuPHODaQjAOD8cdJODagVuNDAEkLODaZTbNDYOjNODa9fHNDYnaPODaX+yMDI8JRODa6xdMDw6wSODa+9HMDwSPUODaCmxLDI1kVODattaLDIUxWODanYDLDcj0XODagqrKDgYuYODaLnTKD0peZODadS7JD4PFaODaRwiJDYEiaODagEKJD4C1aODaJTxIDII+aODaHgYIDwS9aODabv.ID4iyaODa.FnHDU6daODazkOHDQc.aODavS2GDoNXZODatSeGD4UlYODaioGGD85pXODaBYvFDYGlWODa4kYFDIFXVODavSCFDoCAUODaNlsEDANgSODaufXEDYz3QODaqFDEDkGHPODaTavDDkYONODaxgcDDs8NLODaHcKDDgHGJODaNP5CDoO3GODaz8oCDAphEODahnZCDkuFCODazRLCDQ4j.ODa799BD4f88NDaEuxBDYAQ6NDaIkmBDQ1e3NDa8hcBDwap0NDaFpTBDEOwxNDa.7LBDwszuNDa5YFBD4U0rNDa1DABDQlyoNDaq87ADo8ulNDaDE5ADg6piNDaca3ADY+jfNDa..3ADA..dNDa..3ADA..dNDa..3ADA..dNDaqm3ADoq4ZNDald5ADA2yWNDacj8ADwAuTNDaw3ABDUqqQNDa2ZGBDASpNNDazINBDwWqKNDajDVBDIXuHNDa2IeBDEx1ENDaOXoBDQCBCNDaCtzBDgnQ.NDafIACDI7K6MDalnNCD4990MDaJIcCDYN8vMDa5nrCDMdGrMDaUE8CD4edmMDazaNDD4BCiMDakofDDkz0dMDasqyDDAf2ZMDaIeGED8sHWMDav.bEDgDpSMDaNMwEDQGbPMDaJAGFDQWeMMDaGYcFDoRzJMDacQzFDwTaHMDailKGDI1TFMDaqTiGDQLgDMDaAX6GDoo.CMDaurSHDscyAMDa7NrHDwz4.MDas5DIDE3S.MDaErcIDwsA.MDaGe1IDsXC.MDazOOJDg3X.MDaP5mJD4IBAMDacZ.KDMF+AMDagrXKDsiOCMDajrvKDgUyDMDatVHLDkKpFMDaPmeLDAyyHMDaYZ1LD00OKMDagrLMD858MMDaDZhMDkl8PMDahe2MDEZNTMDal4KND8yuWMDa8jeNDQPgaMDaddxNDUHheMDaHiDODEywiMDaBvUODAkOnMDaZBlODcv5rMDarW0ODgkxwMDaYsCPDUR11MDaOAQPDICE7MDaFQcPDMAu.NDa.anPDYLfCNDaLcxPD4lUFNDaAV6PDoyNINDaFDCQDAUKLNDaLlIQD4rJONDaN6NQDobLRNDaXBSQDMEPUNDa95UQDUGUXNDajjWQDgCaaNDa..XQDA..dNDa..XQDA..dNzXsA.zbPD7G32Pr8Q2nPD7G32PhAWeuPD7G32Pwv2LDYliFNTL7MCQbRgjCIVL7MCQlYtlCcn4vPjjcD5PmDaKDQLbiNDa..AMDA..8NDaovhKDA..8NDaWOHJDcSJkNDaP0eHDcSJkNDaP0eHDA..8NDa..MGDA..8NDa..MGDA+A9MzXsIE+gPzg1c3PrIE+gPDF7y4Pr4N+mPDF7y4Phg+0qPDF7y4PXUgKDEXYYNDVU3BQaGmjCIFVU3BQ240hC0gwqPzg1c3PjBBJDcncGNDaRweHDcncGNzXkA";
	
	icons.trademark = Content.createPath();
	icons.trademark.loadFromData(pathData);

	// Libre Wave logo
	pathData = "1199.t0Fv1w+P.jTACwFv1w+P.PZkCwFPyuAQ.PZkCwFPyuAQ.nPfCwF3Kp.Q.nPfCwF3Kp.Q.jTACwFv1w+P.jTACMVafmCHDAPRELDafmCHDA.oUNDa.nHKDA.oUNDa.nHKDAPRELDafmCHDAPRELzXsARhyPD.IUvPrARhyPD.jV4PrAbxHQD.jV4PhU7tRQD.jV4PfBRVDwCoLNDnfjEQ.3MeCIFnfjEQKq7YCcv2UQTp2b0P.eLTDAH8RMjXymQUDY29MMD.SeEQLJ.PCAvzWQDfx7xPhAvzWQzheVwP2tYTDAPRELDfleDQ.jTACwFHINCQ.jTACMVa.MiWDAPRELDa.MiWDA.oUNDa.OnZDA.oUNDa.OnZDAng9MDa.aPbDAng9MDa.gncDA.oUNDafAjfDA.oUNDafiAeDAfC0MjXWwDfDY02pMDbJFHQ8+MVCAmhARDf+.zPhAmhARj0XpwP9.KeDAPRELD.OFGQ.jTACwFPy3EQ.jTACMVavwHgDAPRELDavwHgDA.oUNDav3bkDA.oUNDav3bkDAjrBNDaPRqhDAjrBNDaPRqhDA3FqMDafCHkDA3FqMDafCHkDAHNEMDaPRqhDAHNEMDaPRqhDA.KqLDavIXkDA.KqLDavIXkDAPRELDavwHgDAPRELzXsAIFWRDfEVvPrAo8cRD.jV4PrACChRD.jV4PrAXtlRD.16xPrA4UqRD.jV4PrAMcuRD.jV4PrAuT1RDfEVvPrAROxRDfEVvPrAFhsRDv+O3PrAEwnRDfEVvPrAB2jRDfEVvPrA5GfRDv+O3PrA6VaRDfEVvPrAIFWRDfEVvPi0F3h1KQ.VXACwFnLRKQ.PZkCwF3ohKQ.PZkCwFn+oKQ.3AgCwFHeRLQ.3AgCwFD0YLQ.PZkCwFL3pLQ.PZkCwFL.GLQ.VXACwF3h1KQ.VXACMVaPfSxDAXgELDafrVzDA.oUNDafgX0DA.oUNDafHc2DAXgELDaPwa1DAXgELDavP4zDA7+CNDavrWyDAXgELDaPfSxDAXgELzXsAbcfSDfEVvPrAbcfSD.jV4PrA..vSD.jV4PrA..vSDvIe3PrASajSDvIe3PrASajSD.lW1PrAYetSD.lW1PrAYetSDfwnzPrASajSDfwnzPrASajSD.5DxPrAQouSD.5DxPrAQouSDfEVvPrAbcfSDfEVvPi0FDW9KQ.H1ICwFfyLLQ.BPaCwFbquKQ.BPaCwFDW9KQ.H1ICMVafr7ODAXNpLDafCzQDAXNpLjX+3ZRDAXNpLDH3rDQt71KCABNKQDf0eyPhABNKQTZ3BzP+3ZRDA3YFMD3.cDQ.dlQCwFHK+CQ.dlQCwFHK+CQ.liJCMVa.OnZDA.KqLDa.7XbDA.KqLjXKqScDA.KqLDPbcGQsjyLCADW2QD.qFzPhADW2QTGVB0PKqScDA3nXMD.OFGQ.NJVCwFvCpFQ.NJVCwFvCpFQ.vxJCMVafr7ODAHQnMDafCzQDAHQnMjXZOlRDs0.nMDXmwDQkYaaCA1YLQD.1Z2PhA1YLQDr0.3PZOlRDwbRCND3.cDQ.txfCwFHK+CQ.txfCwFHK+CQ.RDZCMVY...";
	
	icons.logo = Content.createPath();
	icons.logo.loadFromData(pathData);

    // Rhapsody Logo - Reza
    pathData = "129.t01muzuPn+3pBw1mRLqPlxZ8BwVk+TrPrx9.Cw1P51uPn50yBwFGsrvPa4+4BwV4iVuPa4+4BwFOGwsPVsJ.Cw1wfCvPVsJ.Cw1wfCvPjrYGCwlbrDvPkrYGCw1BC1vPLRTDCw1BC1vPWsJ.CwFsE1wPg3J.CwVIFNxPZxV8BMVY";
    
    icons.rhapsodyLogo = Content.createPath();
	icons.rhapsodyLogo.loadFromData(pathData);
	
	// Rhapsody logo with background
	pathData = "166.t01N1g0P4++NBwF9hQ0PDzDSBw1N1g0POnIWBwlWIx0PDzDSBMVaCdGVCUdoBIDaTKuVCkxjLIDaDtnVCUbKNIDaffWVCUMKNIDagfWVCYvnRIDaeOJVCw.8UIDaM6IVCUA8UIDaN6IVC4MKNIDadw0UC4MKNIDaLZCVCsQwJIDa7+TVCsQwJIDaXvGVCkXcGIDaCYoUC0MCOIDa.neUCE8lLIzXkA";
	
	icons.rhapsodyLogoWithBg = Content.createPath();
	icons.rhapsodyLogoWithBg.loadFromData(pathData);
}
